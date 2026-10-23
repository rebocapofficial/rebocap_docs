import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';

let pages=0, images=0, videos=0;
const posters=JSON.parse(fs.readFileSync('scripts/video-posters.json','utf8'));
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,e.name);
  if(e.isDirectory()){walk(file);continue;}
  if(!e.name.endsWith('.html'))continue;
  pages++;
  const $=load(fs.readFileSync(file,'utf8'));
  for(const img of $('article img[src^="/"]').toArray()){
    const el=$(img);
    const dims=Number(el.attr('width'))>0 && Number(el.attr('height'))>0;
    if(!dims&&!/aspect-ratio\s*:/.test(el.attr('style')||''))throw new Error(`Image has no reserved ratio: ${file} ${el.attr('src')}`);
    images++;
  }
  for(const video of $('video').toArray()){
    const el=$(video);
    if(el.attr('src')||el.find('source[src]').length||el.attr('autoplay')!==undefined)throw new Error(`Eager video URL or autoplay: ${file}`);
    if(el.attr('preload')!=='none'||!el.attr('data-on-demand-video'))throw new Error(`Missing on-demand policy: ${file}`);
    if(!el.attr('data-video-src')&&!el.find('source[data-video-src]').length)throw new Error(`Video lost its deferred URL: ${file}`);
    const videoSrc=el.attr('data-video-src')||el.find('source[data-video-src]').first().attr('data-video-src');
    if(posters[videoSrc] && el.attr('poster')!==posters[videoSrc].poster)throw new Error(`Video first-frame poster missing: ${file}`);
    if(el.attr('poster')?.startsWith('/img/')&&!fs.existsSync(path.join('static',el.attr('poster').slice(1))))throw new Error(`Video poster file missing: ${file}`);
    if(!/aspect-ratio\s*:/.test(el.attr('style')||'')&&!el.closest('.html-carousel-slide').length)throw new Error(`Video has no reserved ratio: ${file}`);
    videos++;
  }
}}
walk('build');
console.log(`Verified ${images} image placements and ${videos} click-to-load videos across ${pages} HTML pages.`);
