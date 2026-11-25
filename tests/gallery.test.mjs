import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { filters, galleryManifest, filterEntries, nextIndex } from '../src/galleryData.ts'

test('all seven requested filters are present',()=>assert.deepEqual(filters,['All','Before & After','Grooming','Bathing','Dental','Happy Clients','Behind the Scenes']))
test('dental close-ups appear only after selecting Dental',()=>{
 for(const filter of filters.filter(f=>f!=='Dental'))assert.ok(filterEntries(galleryManifest,filter).every(e=>e.category!=='Dental'),filter)
 assert.equal(filterEntries(galleryManifest,'Dental').length,1)
 assert.equal(filterEntries(galleryManifest,'All').length,14)
})
test('Before & After contains only non-dental comparisons',()=>{
 const results=filterEntries(galleryManifest,'Before & After')
 assert.equal(results.length,9)
 assert.ok(results.every(e=>e.comparison&&e.category!=='Dental'))
})
test('each category returns its own entries',()=>{
 for(const category of ['Grooming','Bathing','Happy Clients','Behind the Scenes'])assert.ok(filterEntries(galleryManifest,category).every(e=>e.category===category))
})
test('lightbox navigation wraps both ways and handles empty collections',()=>{
 assert.equal(nextIndex(0,-1,14),13)
 assert.equal(nextIndex(13,1,14),0)
 assert.equal(nextIndex(0,1,1),0)
 assert.equal(nextIndex(0,1,0),0)
})
test('all originals exist intact at their supplied 206px size with no duplicates',()=>{
 const hashes=new Set()
 for(const entry of galleryManifest){
  const bytes=readFileSync(new URL(`../src/assets/gallery/${entry.file}`,import.meta.url))
  assert.equal(bytes.readUInt32BE(16),206,entry.file)
  assert.equal(bytes.readUInt32BE(20),206,entry.file)
  const hash=createHash('sha256').update(bytes).digest('hex')
  assert.ok(!hashes.has(hash),entry.file)
  hashes.add(hash)
  assert.ok(entry.alt.length>20)
 }
})
