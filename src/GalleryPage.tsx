import { useEffect, useRef, useState } from 'react'
import { Icon } from './components'
import { BookingCTA } from './site'
import { filters, filterEntries, galleryManifest, nextIndex } from './galleryData'
import type { GalleryFilter } from './galleryData'
import './GalleryPage.css'

const originals=import.meta.glob<string>('./assets/gallery/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'})
const entries=galleryManifest.flatMap(entry=>{
 const found=Object.entries(originals).find(([path])=>path.split('/').pop()?.replace(/\.[^.]+$/,'')===entry.file.replace(/\.[^.]+$/,''))
 return found?[{...entry,src:found[1]}]:[]
})
export default function GalleryPage({onBook}:{onBook:()=>void}) {
 const [filter,setFilter]=useState<GalleryFilter>('All')
 const [index,setIndex]=useState<number|null>(null)
 const filtered=filterEntries(entries,filter)
 const selected=index===null?undefined:filtered[index]
 const dialog=useRef<HTMLDialogElement>(null)
 const opener=useRef<HTMLButtonElement|null>(null)
 const touch=useRef<{x:number;y:number}|null>(null)
 const isOpen=!!selected
 const close=()=>{setIndex(null)}
 const move=(direction:number)=>setIndex(current=>nextIndex(current??0,direction,filtered.length))
 useEffect(()=>{
  if(!isOpen)return
  const modal=dialog.current
  const previousOverflow=document.body.style.overflow
  modal?.showModal()
  document.body.style.overflow='hidden'
  return ()=>{modal?.close();document.body.style.overflow=previousOverflow;opener.current?.focus({preventScroll:true})}
 },[isOpen])
 return <div className="gallery-page">
  <section className="gallery-intro gallery-container"><p className="gallery-eyebrow">Backroad Barkers · The gallery</p><h1>A little care.<br/><em>A happy difference.</em></h1><p>Grooming transformations, fresh coats, and moments from the salon.</p><a className="gallery-text-link" href="#gallery-photos">Explore the gallery <span aria-hidden="true">↓</span></a></section>
  <section className="gallery-collection gallery-container" id="gallery-photos" aria-labelledby="gallery-collection-title"><div className="gallery-section-top"><div><p className="gallery-eyebrow">Comfort, from nose to tail</p><h2 id="gallery-collection-title">Life at Backroad Barkers</h2></div><p>Take a closer look at the care behind every visit.</p></div>
   <div className="gallery-filters" role="group" aria-label="Filter gallery">{filters.map(value=><button key={value} aria-pressed={value===filter} onClick={()=>setFilter(value)}>{value}</button>)}</div>
   <div className="gallery-grid-meta"><p role="status" aria-live="polite">{filtered.length} {filtered.length===1?'photo':'photos'} · {filter}</p><p>{filter==='Dental'?'Dental close-ups are shown below.':'Dental close-ups are shown only in the Dental filter.'}</p></div>
   {filtered.length ? <div className="client-photo-grid">{filtered.map((entry,i)=><article className="client-photo-card" key={entry.id}><button onClick={event=>{opener.current=event.currentTarget;setIndex(i)}} aria-label={`Enlarge: ${entry.alt}`} aria-haspopup="dialog"><div className="client-photo-frame"><img src={entry.src} alt={entry.alt} width={206} height={206} loading="lazy" decoding="async"/></div><span className="client-photo-caption"><span>{entry.comparison?'Before & After':entry.category}</span><span aria-hidden="true">↗</span></span></button></article>)}</div>:<div className="gallery-empty"><Icon name="paw"/><h3>No photos to show yet.</h3><p>{filter==='All'?'Our gallery photos will appear here soon.':'There are no photos in this category yet.'}</p>{filter!=='All'&&<button className="button outline" onClick={()=>setFilter('All')}>View all photos</button>}</div>}
  </section>
  <section className="gallery-booking"><div className="gallery-container"><Icon name="paw"/><h2>Ready for a fresh start?</h2><p>Give your dog the care they deserve.</p><BookingCTA onBook={onBook} className="gold"/></div></section>
  <dialog ref={dialog} className="gallery-lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-help" onCancel={event=>{event.preventDefault();close()}} onClick={event=>{if(event.target===event.currentTarget)close()}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1)}if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}}}>
   {selected&&<><div className="lightbox-top"><h2 id="lightbox-title">{selected.comparison?'Before & After':selected.category}</h2><button autoFocus onClick={close} aria-label="Close photo"><Icon name="close"/></button></div><div className="lightbox-stage" onTouchStart={event=>{touch.current=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null}} onTouchCancel={()=>{touch.current=null}} onTouchEnd={event=>{const start=touch.current;touch.current=null;if(!start||!event.changedTouches.length)return;const dx=event.changedTouches[0].clientX-start.x;const dy=event.changedTouches[0].clientY-start.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1)}}><img key={selected.id} src={selected.src} alt={selected.alt}/></div><div className="lightbox-controls"><button aria-label="Previous photo" onClick={()=>move(-1)} disabled={filtered.length<2}>‹</button><p aria-live="polite">{(index??0)+1} of {filtered.length}</p><button aria-label="Next photo" onClick={()=>move(1)} disabled={filtered.length<2}>›</button></div><p className="lightbox-caption">{selected.alt}</p><p id="lightbox-help">Use arrow keys or swipe to browse. Press Escape to close.</p></>}
  </dialog>
 </div>
}
