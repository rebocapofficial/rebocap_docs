const fs = require('node:fs');
const path = require('node:path');
const {imageSize} = require('image-size');
const {parseExpressionAt} = require('acorn');
const posters = require('./video-posters.json');

// Reserve image space before lazy loading, so a hash target doesn't move after
// navigation. Run during MDX compilation for identical server/client markup.
module.exports = function imageDimensions() {
  const staticDir = path.resolve(__dirname, '../static');
  const sizes = new Map();
  return function transform(tree) {
    function visit(node, inVideo = false) {
      const html = node.type === 'element' && node.tagName === 'img';
      const jsx = ['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type) && node.name === 'img';
      const isJsx = ['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type);
      const tag = node.tagName || node.name;
      const getAttr = name => isJsx ? node.attributes?.find(a => a.name === name)?.value : node.properties?.[name];
      const setAttr = (name, value) => {
        if (isJsx) { node.attributes = node.attributes.filter(a => a.name !== name); node.attributes.push({type:'mdxJsxAttribute',name,value}); }
        else { node.properties ||= {}; node.properties[name] = value; }
      };
      const removeAttr = name => { if(isJsx)node.attributes=node.attributes.filter(a=>a.name!==name);else delete node.properties?.[name]; };
      const setRatio = ratio => {
        const style=getAttr('style');
        if(!isJsx) setAttr('style',`${style ? style.replace(/;?\s*$/, ';') : ''}aspect-ratio:${ratio};height:auto`);
        else {
          let original='{}';
          if(style?.type==='mdxJsxAttributeValueExpression') original=style.value;
          else if(typeof style==='string') original=JSON.stringify(Object.fromEntries(style.split(';').filter(s=>s.includes(':')).map(s=>{const i=s.indexOf(':');return [s.slice(0,i).trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),s.slice(i+1).trim()]})));
          const value=`({...(${original}),aspectRatio:${JSON.stringify(ratio)},height:"auto"})`;
          setAttr('style',{type:'mdxJsxAttributeValueExpression',value,data:{estree:{type:'Program',sourceType:'module',body:[{type:'ExpressionStatement',expression:parseExpressionAt(value,0,{ecmaVersion:2020})}]}}});
        }
      };
      if (html || jsx) {
        const get = name => html ? node.properties?.[name] : node.attributes?.find(a => a.name === name)?.value;
        const src = get('src');
        // Preserve authored widths, including percentages, but reserve the
        // intrinsic ratio when height is automatic. Markdown image dimensions
        // are also supplied by Docusaurus's normal image transform.
        if (typeof src === 'string' && src.startsWith('/img/')) {
          const file = path.resolve(staticDir, decodeURIComponent(src.split(/[?#]/)[0].slice(1)));
          if (file.startsWith(staticDir + path.sep) && fs.existsSync(file)) {
            if (!sizes.has(file)) sizes.set(file, imageSize(fs.readFileSync(file)));
            const {width, height} = sizes.get(file);
            if (width && height) {
              if(!get('width') && !get('height')) {setAttr('width',String(width));setAttr('height',String(height));}
              if(!get('height') || (get('width')===String(width) && get('height')===String(height))) setRatio(`${width} / ${height}`);
            }
          }
        }
      }
      if(tag==='video') {
        const sourceNode = (node.children || []).find(child => (child.tagName || child.name) === 'source');
        const sourceValue = sourceNode?.properties?.src || sourceNode?.attributes?.find(a=>a.name==='src')?.value;
        const videoSrc = getAttr('src') || sourceValue;
        const poster = typeof videoSrc === 'string' ? posters[videoSrc] : undefined;
        if(poster && !getAttr('poster')) setAttr('poster',poster.poster);
        removeAttr('autoPlay');removeAttr('autoplay');
        setAttr('preload','none');setAttr('data-on-demand-video','true');
        setAttr('controls',isJsx ? null : true);
        setRatio(poster ? `${poster.width} / ${poster.height}` : Number(getAttr('width'))>0 && Number(getAttr('height'))>0 ? `${getAttr('width')} / ${getAttr('height')}` : '16 / 9');
      }
      if(tag==='video' || (tag==='source' && inVideo)) {
        const src=getAttr('src');
        if(src) {setAttr('data-video-src',src);removeAttr('src');}
      }
      for (const child of node.children || []) visit(child, inVideo || tag === 'video');
    }
    visit(tree);
  };
};
