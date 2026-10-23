import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import structure from './sidebars.structure';

// One structure for every locale: explicit navigation labels must not fall back
// to a document's first heading (such as "Tips" or a Markdown link).
const translations: Record<string, Record<string,string>> = JSON.parse(
  readFileSync(path.join(__dirname,'sidebar-labels.json'),'utf8'),
);
const locale=process.env.DOCUSAURUS_CURRENT_LOCALE||'en';
const labels=translations[locale];
if(!labels)throw new Error(`Missing sidebar translations for ${locale}`);
const prefix=locale==='en'?'':`/${locale}`;
function label(key:string):string {
  if(!labels[key])throw new Error(`Missing ${locale} sidebar label: ${key}`);
  return labels[key];
}
function escapeHtml(value:string):string {
  return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function localize(items: any[]):any[] {
  return items.map(item=>{
    if(item.type==='html'){
      const key=item.value.match(/>([^<]+)</)?.[1];
      return {...item,value:`<div class="sidebar-section-label">${escapeHtml(label(key))}</div>`};
    }
    const translated={...item,label:label(item.label)};
    if(item.type==='category')translated.items=localize(item.items);
    if(item.type==='link')translated.href=`${prefix}/docs/#navigation_directory`;
    return translated;
  });
}
const sidebars:SidebarsConfig={docsSidebar:localize(structure.docsSidebar as any[])};
export default sidebars;
