import {test} from 'node:test';
import assert from 'node:assert/strict';
import {compile} from '@mdx-js/mdx';
import raw from 'rehype-raw';
import transform from './rehype-image-dimensions.cjs';
import fs from 'node:fs';

test('HTML and MDX keep percentage widths and reserve the intrinsic image ratio', async()=>{
  for(const format of ['md','mdx']){
    const result=String(await compile('<img src="/img/skeleton_position.png" width="50%" />',{
      format,rehypePlugins:format==='md'?[raw,transform]:[transform],
    }));
    assert.match(result,/width: "50%"/);
    assert.match(result,/aspectRatio: "1035 \/ 1035"/);
    assert.match(result,/height: "auto"/);
  }
});
test('a local MP4 shows its first-frame poster without attaching the video source',async()=>{
  const posters=JSON.parse(fs.readFileSync(new URL('./video-posters.json',import.meta.url),'utf8'));
  const src='/img/kuaichai_normal.mp4';
  for(const format of ['md','mdx']){
    const result=String(await compile(`<video><source src="${src}" /></video>`,{
      format,rehypePlugins:format==='md'?[raw,transform]:[transform],
    }));
    assert(result.includes(`poster: "${posters[src].poster}"`));
    assert(result.includes(`"data-video-src": "${src}"`));
    assert(!result.includes(`src: "${src}"`));
  }
});
test('video sources are deferred before rendering and do not change audio sources',async()=>{
  for(const format of ['md','mdx']){
    const result=String(await compile('<video autoplay preload="auto" src="/a.mp4"><source src="/b.mp4" /></video>\n\n<audio><source src="/c.mp3" /></audio>',{
      format,rehypePlugins:format==='md'?[raw,transform]:[transform],
    }));
    assert.match(result,/"data-video-src": "\/a.mp4"/);
    assert.match(result,/"data-video-src": "\/b.mp4"/);
    assert.match(result,/src: "\/c.mp3"/);
    assert.match(result,/preload: "none"/);
    assert.match(result,/aspectRatio: "16 \/ 9"/);
    assert.doesNotMatch(result,/(?:autoPlay|autoplay):/);
  }
});
