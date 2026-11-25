import { Icon, Forest } from './components'
import type { IconName } from './components'
import hero from './assets/services-hero.png'
import storyPhotos from './assets/about-story.png'
import './AboutPage.css'

const values: {title:string; text:string; icon:IconName}[] = [
 {title:'Personal & Friendly',text:'A welcoming, one-on-one experience for you and your dog.',icon:'heart'},
 {title:'Extra Gentle Care',text:'Calm, patient handling that keeps dogs relaxed and comfortable.',icon:'paw'},
 {title:'Healthy & Clean',text:'Quality care and products to support a clean, healthy coat and skin.',icon:'leaf'},
 {title:'Helpful & Supportive',text:'I’m here to answer questions, offer grooming advice, and find what works best for your dog.',icon:'paw'},
]
function StoryPhoto({cell,label,className=''}:{cell:number;label:string;className?:string}) {
 return <div className={`story-photo ${className}`} role="img" aria-label={label}><span style={{backgroundImage:`url(${storyPhotos})`,backgroundPosition:`${cell*50}% center`}}/></div>
}
function HeartPaw(){return <span className="heart-paw" aria-hidden="true"><Icon name="heart"/><Icon name="paw"/></span>}
function LocalBadge(){return <div className="local-badge"><Icon name="paw" className="local-watermark"/><div className="local-mark" aria-hidden="true"><svg viewBox="0 0 160 105" fill="none"><path d="m22 77 59-66 58 66M58 37l23-26 25 29-18-9-7 10-7-15" stroke="#bf7e12" strokeWidth="5" strokeLinejoin="round"/></svg><Icon name="tree" className="badge-tree left"/><Icon name="tree" className="badge-tree right"/><Icon name="paw" className="badge-paw"/><Icon name="pin" className="badge-pin"/></div><p>Proudly Serving<br/><strong>Kaslo & Area</strong></p><span className="gold-swoosh"/></div>}
export default function AboutPage({onBook}:{onBook:()=>void}) {
 return <div className="about-page">
  <section className="bree-hero" aria-labelledby="bree-title"><img src={hero} alt="Happy golden retriever in a mountain forest at sunset" fetchPriority="high"/><div className="bree-hero-shade"/><div className="bree-hero-copy"><p className="bree-eyebrow">About Backroad Barkers</p><h1 id="bree-title">Meet Bree <HeartPaw/></h1><p>The heart behind Backroad Barkers.</p><span className="gold-swoosh"/></div></section>
  <section className="bree-intro about-width" aria-labelledby="intro-title"><StoryPhoto cell={0} label="Illustrative portrait of a groomer cuddling a happy dog" className="bree-portrait"/><div className="bree-bio"><p className="bio-eyebrow">A personal, caring approach</p><h2 id="intro-title">Hi, I’m Bree! <Icon name="paw"/></h2><p>I’m the groomer and owner of Backroad Barkers. I provide personalized, one-on-one grooming for dogs in Kaslo & Area, with a focus on gentle care, comfort, and a positive experience every time they visit.</p><p>Dogs are family, and I treat each one like my own — with patience, kindness, and plenty of love. Whether it’s a simple bath or a full groom, my goal is to keep your dog happy, healthy and feeling their best.</p></div><LocalBadge/></section>
  <section className="bree-values about-width" aria-labelledby="values-title"><h2 id="values-title">What Makes Backroad Barkers Different?</h2><div className="values-grid">{values.map((value,i)=><article key={value.title}><div className={`value-symbol ${i===3?'support-symbol':''}`}><Icon name={value.icon}/>{i===3&&<Icon name="heart"/>}</div><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></section>
  <section className="bree-philosophy about-width" aria-labelledby="philosophy-title"><StoryPhoto cell={1} label="A golden retriever relaxing in a gentle bubble bath"/><div className="philosophy-copy"><Icon name="heart" className="philosophy-heart"/><h2 id="philosophy-title">More Than Grooming<br/>It’s <em>Care, Comfort & Connection.</em></h2><p>At Backroad Barkers, grooming is about much more than just a clean coat — it’s about your dog’s overall well-being. I create a calm, stress-free environment where dogs feel safe, cared for, and genuinely loved.</p></div><StoryPhoto cell={2} label="A peaceful dog resting on a soft knitted blanket"/></section>
  <section className="bree-booking" aria-labelledby="bree-booking-title"><Forest/><div className="bree-booking-inner"><div className="booking-paw-rule"><Icon name="paw"/></div><h2 id="bree-booking-title">Let’s Keep Your Dog<br/>Looking & Feeling Their Best.</h2><button className="button gold" onClick={onBook}><Icon name="calendar"/>Book an Appointment<Icon name="arrow"/></button></div></section>
 </div>
}
