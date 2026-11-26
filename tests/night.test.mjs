import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
const init=readFileSync(new URL('../public/theme-init.js',import.meta.url),'utf8')
function boot(value,blocked=false){
 const root={dataset:{},style:{}}
 let color
 runInNewContext(init,{document:{documentElement:root,querySelector:()=>({setAttribute:(_,v)=>{color=v}})},localStorage:{getItem:()=>{if(blocked)throw Error('blocked');return value}}})
 return {root,color}
}
test('saved night mode initializes all theme attributes before rendering',()=>{
 const {root,color}=boot('evergreen')
 assert.equal(root.dataset.theme,'night');assert.equal(root.dataset.galleryTheme,'evergreen');assert.equal(root.style.colorScheme,'dark');assert.equal(color,'#071f18')
})
test('day preference and blocked storage fall back safely',()=>{
 for(const result of [boot('cream'),boot(null),boot('unexpected'),boot(null,true)]){
  assert.equal(result.root.dataset.theme,'day');assert.equal(result.root.style.colorScheme,'light');assert.equal(result.color,'#173d30')
 }
})
function luminance(hex){const c=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
test('night body, muted and accent text pass 4.5:1 on each main surface',()=>{
 const css=readFileSync(new URL('../src/Night.css',import.meta.url),'utf8')
 const tokens=Object.fromEntries([...css.matchAll(/--night-([a-z]+):(#[a-f0-9]{6})/g)].map(m=>[m[1],m[2]]))
 for(const foreground of ['text','muted','gold'])for(const background of ['bg','surface','raised'])assert.ok(contrast(tokens[foreground],tokens[background])>=4.5,`${foreground} on ${background}`)
 assert.ok(contrast('#103425','#f4f7ef')>=4.5)
 assert.ok(contrast('#102a1e','#e7bd68')>=4.5)
})
