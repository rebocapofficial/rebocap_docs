import fs from 'node:fs';
import path from 'node:path';
// Optional test tool: install jsdom separately and set JSDOM_MODULE_URL to its
// file URL, or install it in the local Node module resolution path.
const {JSDOM, ResourceLoader, VirtualConsole} = await import(process.env.JSDOM_MODULE_URL || 'jsdom');
const manifest = JSON.parse(fs.readFileSync('scripts/compiled-anchor-aliases.json','utf8'));
class LocalResources extends ResourceLoader {
  fetch(url) {
    const u=new URL(url);
    if(u.hostname!=='doc.rebocap.com')return null;
    const file=path.resolve('build',decodeURIComponent(u.pathname).replace(/^\//,''));
    if(!file.startsWith(path.resolve('build')+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory())return null;
    return Promise.resolve(fs.readFileSync(file));
  }
}
async function check(page, aliases, injectMismatch=false) {
  const errors=[];
  const vc=new VirtualConsole();
  for(const level of ['error','warn']) vc.on(level,(...args)=>errors.push(args.map(a=>a?.stack||(typeof a==='object'?JSON.stringify(a):String(a))).join(' ')));
  vc.on('jsdomError',e=>{if(!/Not implemented: (window.scrollTo|HTMLMediaElement)/.test(e.message))errors.push(e.message)});
  let html=fs.readFileSync('build/'+page,'utf8');
  if(injectMismatch) html=html.replaceAll('特别声明','TEST_INJECTED_MISMATCH');
  const dom=new JSDOM(html,{
    url:'https://doc.rebocap.com/'+page.replace(/index\.html$/,'')+(aliases[0] ? '#'+encodeURIComponent(aliases[0].id) : ''),
    runScripts:'dangerously', resources:new LocalResources(),pretendToBeVisual:true,virtualConsole:vc,
    beforeParse(w){
      w.scrollTo=()=>{};
      w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
      w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};
      w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
      if(process.env.CHECK_MEDIA==='1') {
        w.HTMLMediaElement.prototype.load=function(){this.dataset.testLoads=String(Number(this.dataset.testLoads||0)+1)};
        w.HTMLMediaElement.prototype.play=function(){this.dataset.testPlays=String(Number(this.dataset.testPlays||0)+1);return Promise.resolve()};
        w.HTMLMediaElement.prototype.pause=function(){};
      }
      // jsdom has no layout. Give headings nonzero boxes so Docusaurus's TOC
      // visibility code doesn't recurse through zero-height ancestors forever.
      w.Element.prototype.getBoundingClientRect=()=>({top:0,left:0,bottom:1,right:1,width:1,height:1});
    },
  });
  await new Promise(resolve=>dom.window.addEventListener('load',resolve,{once:true}));
  for(let i=0;i<50&&!dom.window.docusaurusRoot;i++) await new Promise(resolve=>setTimeout(resolve,100));
  for(let i=0;i<100&&dom.window.docusaurusRoot?._internalRoot?.current?.memoizedState?.isDehydrated;i++) await new Promise(resolve=>setTimeout(resolve,50));
  // Let passive effects add the user-facing play controls after hydration.
  await new Promise(resolve=>setTimeout(resolve,50));
  const missing=aliases.filter(a=>!dom.window.document.getElementById(a.id));
  if(!dom.window.docusaurusRoot) errors.push('React root not initialized');
  if(dom.window.docusaurusRoot?._internalRoot?.current?.memoizedState?.isDehydrated) errors.push('Hydration did not finish');
  if(process.env.CHECK_MEDIA==='1'&&!injectMismatch) {
    for(const video of dom.window.document.querySelectorAll('video[data-on-demand-video]')) {
      if(video.getAttribute('src')||video.querySelector('source[src]')||video.dataset.testLoads||video.dataset.testPlays)errors.push('Video loaded before user interaction');
      const button=video.closest('.video-zoom-wrapper')?.querySelector('.video-load-button');
      if(!button){errors.push('Video play button missing');continue;}
      button.click();
      if(!video.dataset.videoLoaded||!video.dataset.testLoads||!video.dataset.testPlays)errors.push('Click did not load and play video');
      for(const el of [video,...video.querySelectorAll('source')])if(el.dataset.videoSrc&&el.getAttribute('src')!==el.dataset.videoSrc)errors.push('Deferred video URL not restored');
    }
  }
  const hydration=errors.filter(e=>/418|423|425|hydration|Hydration/i.test(e));
  dom.window.close();
  return {page,missing:missing.map(a=>a.id),hydration,other:errors.filter(e=>!hydration.includes(e))};
}
const control=await check('zh-Hans/docs/index.html',[],true);
console.log(`Positive control: detected ${control.hydration.length} hydration errors after deliberate HTML mismatch.`);
if(!control.hydration.length) throw new Error('Control did not detect the deliberately injected mismatch');
let total=0;
const pages=new Map(Object.values(manifest).map(v=>[v.page,v.aliases]));
function collect(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,e.name);
  if(e.isDirectory())collect(file);
  else if(e.name==='index.html'){
    const page=path.relative('build',file).replaceAll('\\','/');
    if(/^(?:[^/]+\/)?docs\//.test(page)&&!pages.has(page))pages.set(page,[]);
  }
}}
collect('build');
for(const [page,aliases]of [...pages].filter(([page])=>!process.env.HYDRATION_PAGE||page===process.env.HYDRATION_PAGE)) {
  const result=await check(page,aliases);
  if(result.hydration.length||result.missing.length||result.other.length)console.log(JSON.stringify(result));
  if(result.hydration.length||result.missing.length||result.other.length)process.exitCode=1;
  total++;
}
console.log(`Hydrated ${total} documentation pages; checked that compatibility anchors survive client startup.`);
