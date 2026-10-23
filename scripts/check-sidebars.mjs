import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {load} from 'cheerio';

const require=createRequire(import.meta.url);
const root=path.resolve('.');
function sidebar(locale){
  process.env.DOCUSAURUS_CURRENT_LOCALE=locale;
  const jiti=require('jiti')(path.join(root,'sidebars.ts'),{requireCache:false,fsCache:false});
  return jiti(path.join(root,'sidebars.ts')).default.docsSidebar;
}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const translations=JSON.parse(fs.readFileSync('sidebar-labels.json','utf8'));
const schema=require('jiti')(path.join(root,'sidebars.structure.ts'))(path.join(root,'sidebars.structure.ts')).default.docsSidebar;
assert.deepEqual(sidebar('zh-Hans'),schema,'Reviewed Chinese sidebar must stay unchanged');
let total=0;
for(const locale of Object.keys(translations)){
 const items=sidebar(locale),ids=[],categories=[];
 const prefix=locale==='en'?'':`/${locale}`;
 function collect(nodes){for(const item of nodes){
   if(item.type==='doc')ids.push(item.id);
   if(item.type==='category'){
     assert.equal(item.link?.type,'doc',`${locale}/${item.label} needs a landing page`);
     ids.push(item.link.id);categories.push(item);collect(item.items);
   }
   if(item.type==='link')assert.equal(item.href,`${prefix}/docs/#navigation_directory`);
   if(item.label)assert(Object.values(translations[locale]).includes(item.label),`Untranslated label: ${locale}/${item.label}`);
 }}
 collect(items);
 assert.equal(ids.length,new Set(ids).size,`${locale}: duplicate landing page`);
 const docsDir=locale==='en'?'docs':`i18n/${locale}/docusaurus-plugin-content-docs/current`;
 // Docusaurus translates the default locale's doc IDs; locale-only offline
 // exports (for example ja/tutorial/temp.md) are not published doc routes.
 const expected=files('docs').filter(p=>/\.mdx?$/.test(p)).map(p=>path.relative('docs',p).replaceAll('\\','/').replace(/\.mdx?$/,''));
 for(const id of ids)assert(fs.existsSync(path.join(docsDir,id+'.md'))||fs.existsSync(path.join(docsDir,id+'.mdx')),`${locale}: missing translated source ${id}`);
 assert.deepEqual([...ids].sort(),expected.sort(),`${locale}: missing document`);
 const jiti=require('jiti')(path.join(root,'sidebars.structure.ts'));
 function shape(nodes){return nodes.map(n=>({type:n.type,id:n.id||n.link?.id,items:n.items?shape(n.items):undefined}));}
 assert.deepEqual(shape(items),shape(jiti(path.join(root,'sidebars.structure.ts')).default.docsSidebar),`${locale}: different structure`);
 for(const category of categories){
   const route=category.link.id.replace(/\/README$/,'').replace(/^README$/,'').replace(/^plugins\/plugins$/,'plugins');
   const href=`${prefix}/docs/${route}/`;
   const target$=load(fs.readFileSync(path.join('build',href,'index.html'),'utf8'));
   const a=target$('.theme-doc-sidebar-container a').toArray().find(el=>target$(el).text().trim()===category.label);
   assert(a,`Missing category: ${locale}/${category.label}`);
   assert.equal(target$(a).attr('href'),href);
   assert(target$(a).parent().find('button').length,`${locale}/${category.label}: separate toggle missing`);
 }
 const home$=load(fs.readFileSync(path.join('build',prefix,'docs/index.html'),'utf8'));
 assert.equal(home$('[id="navigation_directory"]').length,1,`${locale}: directory target missing`);
 assert(!home$('.theme-doc-sidebar-container').text().includes('[连接面板](connect)'));
 total+=ids.length;
}
console.log(`Verified ${total} document entries across 8 locales: reviewed structure, localized labels, unique landing pages and independent toggles.`);
