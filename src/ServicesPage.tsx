import { useEffect, useRef, useState } from 'react'
import { Icon, Forest } from './components'
import type { IconName } from './components'
import hero from './assets/services-hero.png'
import husky from './assets/deshedding.png'
import photos from './assets/homepage-dogs.png'
import dental from './assets/dog-gallery.png'
import './ServicesPage.css'

type Service = { title: string; description: string; price: number; icon: IconName | 'package'; cell: number; details: string[] }
const offerings: Service[] = [
 {title:'Bath & Refresh',description:'A gentle, refreshing clean for a healthy, happy coat.',price:35,icon:'bath',cell:0,details:['Gentle bath and thorough rinse','Drying and brushing for a fresh, comfortable coat','Care tailored to your dog’s coat and temperament']},
 {title:'Full Grooming',description:'A complete grooming service including bath, brush, haircut and style.',price:75,icon:'scissors',cell:1,details:['Bath, brush and drying','Haircut and styling suited to your dog','A conversation about your preferred look before we begin']},
 {title:'Dental Care',description:'A gentle teeth cleaning to help reduce plaque, freshen breath and support oral health.',price:25,icon:'tooth',cell:2,details:['Gentle grooming dental care','Ask us about the care options suited to your dog','Grooming dental care does not replace veterinary dental treatment']},
 {title:'Nail Trim',description:'Safe and comfortable nail care to keep your dog active and pain-free.',price:15,icon:'scissors',cell:3,details:['Patient handling and careful nail trimming','Tell us about paw sensitivity when booking','A comfortable approach to your dog’s individual needs']},
 {title:'Full Package',description:'Our complete care bundle for a clean, healthy and well-groomed dog.',price:125,icon:'package',cell:1,details:['A complete grooming and care appointment','Discuss the services included for your dog when booking','Personalized care for their coat, comfort and grooming needs']},
]
const shedding: Service = {title:'De-Shedding',description:'A specialized treatment that helps reduce loose hair, remove excess undercoat and keep your dog’s coat healthy.',price:45,icon:'brush',cell:0,details:['Brushing to remove loose hair and excess undercoat','Coat care tailored to your dog','Ask about adding this treatment to your grooming visit']}
function ServiceIcon({name}:{name:Service['icon']}) {
 return name === 'package' ? <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="m3 7 9-5 9 5-9 5Zm0 0v11l9 4 9-4V7M12 12v10M7 4l10 6M3 7 1 12l9 4 2-4 2 4 9-4-2-5"/></svg> : <Icon name={name}/>
}
function Price({value}:{value:number}) {return <div className="price-pill">From <strong>${value}</strong></div>}
export default function ServicesPage({onBook}:{onBook:()=>void}) {
 const [selected,setSelected]=useState<Service|null>(null)
 const detailDialog=useRef<HTMLDialogElement>(null)
 useEffect(()=>{if(selected) detailDialog.current?.showModal();else detailDialog.current?.close()},[selected])
 const bookSelected=()=>{detailDialog.current?.close();setSelected(null);onBook()}
 return <div className="services-page">
  <section className="care-hero" aria-labelledby="care-title">
   <img src={hero} alt="A happy golden retriever resting on a log in an alpine forest" fetchPriority="high"/>
   <div className="care-hero-shade"/>
   <div className="care-hero-copy"><p className="care-eyebrow">Our Services</p><h1 id="care-title">Professional Care<br/>for <em>Happy, Healthy Dogs</em></h1><p>A full range of grooming and care services, tailored<br className="care-desktop-break"/> to your dog’s needs, comfort and well-being.</p></div>
  </section>
  <section className="care-main" aria-labelledby="main-services-title">
   <div className="care-heading"><Icon name="paw"/><h2 id="main-services-title">Main Services</h2></div>
   <div className="care-grid">{offerings.map((s,i)=><article key={s.title} className={`care-card ${i===4?'featured':''}`}>
    {i===4 && <span className="best-value">★ Best Value</span>}
    <div className={`care-photo care-photo-${i}`} role="img" aria-label={i===2?'A dog’s clean teeth':s.title}><div style={{backgroundImage:`url(${i===2?dental:photos})`,backgroundSize:i===2?'300% 300%':'300% 400%',backgroundPosition:`${s.cell%3*50}% ${Math.floor(s.cell/3)*100/3}%`}}/></div>
    <div className="care-card-body"><span className="care-icon"><ServiceIcon name={s.icon}/></span><h3>{s.title}</h3><p>{s.description}</p><Price value={s.price}/><button className="care-plus" aria-label={`View ${s.title} details`} onClick={()=>setSelected(s)}>+</button></div>
   </article>)}</div>
  </section>
  <section className="care-extras" aria-label="Additional grooming services">
   <article className="shedding-service"><img src={husky} alt="A husky enjoying a gentle brushing to remove loose undercoat" loading="lazy"/><div><h2><span className="extras-icon"><Icon name="brush"/></span>De-Shedding</h2><p>{shedding.description}</p><div className="shedding-price"><Price value={45}/><button className="care-plus" aria-label="View De-Shedding details" onClick={()=>setSelected(shedding)}>+</button></div></div></article>
   <article className="premium-extras"><div className="premium-heading"><span className="extras-icon"><Icon name="leaf"/></span><div><h2>Premium Add-Ons</h2><p>Enhance your dog’s grooming experience<br/> with optional upgrades.</p></div></div><ul>{['Conditioning Treatment','Paw & Pad Care','Ear Cleaning','Coat & Skin Boost','Deodorizing Finish'].map(item=><li key={item}>{item}</li>)}</ul><div className="coming-soon"><Icon name="paw"/><p>More<br/>Add-Ons<br/>Coming Soon!</p></div></article>
  </section>
  <section className="care-booking" aria-labelledby="care-booking-title"><Forest/><div className="care-booking-content"><Icon name="paw"/><h2 id="care-booking-title">Ready to Book?</h2><p>Give your dog the care they deserve.</p><button className="button gold" onClick={onBook}><Icon name="calendar"/>Book Appointment<Icon name="arrow"/></button></div></section>
  <dialog ref={detailDialog} className="care-dialog" aria-labelledby="care-detail-title" onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)setSelected(null)}}><button className="dialog-close round-button" aria-label="Close service details" onClick={()=>setSelected(null)}><Icon name="close"/></button>{selected && <><p className="eyebrow">Personalized care for your dog</p><h2 id="care-detail-title">{selected.title}</h2><p>{selected.description}</p><ul>{selected.details.map(item=><li key={item}>{item}</li>)}</ul><Price value={selected.price}/><p className="care-price-note">Starting price. We’ll confirm the final price and service details with you when booking.</p><button className="button green" onClick={bookSelected}><Icon name="calendar"/>Book Appointment</button></>}</dialog>
 </div>
}
