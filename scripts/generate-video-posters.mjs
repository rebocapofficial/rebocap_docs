// Run after adding/replacing a local MP4. FFmpeg is a build-time authoring tool;
// deployments only need the committed JPGs and manifest, not FFmpeg.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {imageSize} from 'image-size';

const ffmpeg=process.env.FFMPEG_PATH||'ffmpeg';
const root=path.resolve('static');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const result={};
fs.mkdirSync(path.join(root,'img/video-posters'),{recursive:true});
for(const file of walk(path.join(root,'img')).filter(f=>f.toLowerCase().endsWith('.mp4'))){
  const hash=createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  const url='/'+path.relative(root,file).replaceAll('\\','/');
  const poster=`/img/video-posters/${hash.slice(0,20)}.jpg`;
  const output=path.join(root,poster.slice(1));
  if(!fs.existsSync(output))execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-i',file,'-frames:v','1','-vf','scale=960:-2','-q:v','3','-y',output],{windowsHide:true});
  const {width,height}=imageSize(fs.readFileSync(output));
  result[url]={poster,width,height,sha256:hash};
}
fs.writeFileSync('scripts/video-posters.json',JSON.stringify(result,null,2)+'\n');
console.log(`Prepared first-frame posters for ${Object.keys(result).length} local MP4s.`);
