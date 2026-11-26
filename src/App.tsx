import GalleryPage from './GalleryPage'
import { BookingCTA, ThemeToggle, CONTACT } from './site'
import AboutPage from './AboutPage'
import { Icon, Brand, Forest } from './components'
import type { IconName } from './components'
import ServicesPage from './ServicesPage'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import hero from './assets/salon-hero.png'
import owner from './assets/about-care.png'
import dogs from './assets/homepage-dogs.png'
import './App.css'
import './desktop.css'
import './Mobile.css'
import './Header.css'
import './Tablet.css'

const services: {title:string;description:string;icon:IconName;cell:number;detail:string}[] = [
 {title:'Bath & Refresh',description:'A gentle clean for a healthy, happy coat.',icon:'bath',cell:0,detail:'A refreshing bath, gentle shampoo, thorough rinse and dry to leave your dog feeling clean and comfortable.'},
 {title:'Full Grooming',description:'Bath, brush, haircut and style.',icon:'scissors',cell:1,detail:'A complete grooming visit, with a bath, brushing and a haircut tailored to your dog’s coat and your preferences.'},
 {title:'Dental Care',description:'Keep their smile clean and healthy.',icon:'tooth',cell:2,detail:'Ask us about our gentle dental care options when booking your dog’s grooming appointment.'},
 {title:'Nail Trim',description:'Safe and comfortable nail care.',icon:'scissors',cell:3,detail:'Thoughtful, patient nail care to help keep every step comfortable. Tell us if your dog is sensitive about their paws.'},
 {title:'De-Shedding',description:'Reduce shedding and keep their coat healthy.',icon:'brush',cell:4,detail:'Thorough brushing and coat care to help remove loose hair and leave your dog’s coat looking its best.'},
 {title:'Premium Add-Ons',description:'Spa treatments, coat care and more.',icon:'leaf',cell:5,detail:'Personalize your visit with extra coat care and spa treatments. Contact us to discuss the right options for your dog.'},
]
function DogPhoto({ cell, label, className = '' }: { cell:number;label:string;className?:string }) {return <div className={`dog-photo ${className}`} role="img" aria-label={label}><span className="photo-crop" style={{backgroundImage:`url(${dogs})`,backgroundPosition:`${(cell%3)*50}% ${Math.floor(cell/3)*100/3}%`}}/></div>}
function Heading({children, subtitle}: {children:ReactNode;subtitle:string}) {return <div className="section-heading"><Icon name="paw"/><h2><span>{children}</span></h2><p>{subtitle}</p></div>}
function App() {
 const isServicesPage = /^\/services\/?$/.test(window.location.pathname)
 const isAboutPage = /^\/about\/?$/.test(window.location.pathname)
 const isGalleryPage = /^\/gallery\/?$/.test(window.location.pathname)
 const isInnerPage = isServicesPage || isAboutPage || isGalleryPage
 const [theme,setTheme]=useState<'cream'|'evergreen'>(()=>{try{return localStorage.getItem('barkers-theme')==='evergreen'?'evergreen':'cream'}catch{return 'cream'}})
 useEffect(()=>{document.documentElement.dataset.galleryTheme=theme;document.documentElement.dataset.theme=theme==='cream'?'day':'night';try{localStorage.setItem('barkers-theme',theme)}catch{/* The toggle still works without storage. */}},[theme])
 const activePage = isGalleryPage ? 'Gallery' : isAboutPage ? 'About' : isServicesPage ? 'Services' : 'Home'
 useEffect(() => { document.title = isGalleryPage ? 'Gallery | Backroad Barkers' : isAboutPage ? 'Meet Bree | Backroad Barkers' : isServicesPage ? 'Our Services | Backroad Barkers' : 'Backroad Barkers | Dog Grooming & Care' }, [isServicesPage, isAboutPage, isGalleryPage])
 const [menu,setMenu]=useState(false)
 const headerRef=useRef<HTMLElement>(null)
 const menuButtonRef=useRef<HTMLButtonElement>(null)
 useEffect(()=>{
  if(!menu)return
  const dismiss=(event:PointerEvent)=>{if(event.target instanceof Node&&!headerRef.current?.contains(event.target))setMenu(false)}
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenu(false);menuButtonRef.current?.focus()}}
  document.addEventListener('pointerdown',dismiss)
  document.addEventListener('keydown',escape)
  return ()=>{document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',escape)}
 },[menu])
 const [panel,setPanel]=useState<'booking'|'about'|'blog'|'social'|number|null>(null)
 const [gallery,setGallery]=useState(0)
 const dialog=useRef<HTMLDialogElement>(null)
 useEffect(()=>{if(panel!==null) dialog.current?.showModal();else dialog.current?.close()},[panel])
 const open=(value:typeof panel)=>{setPanel(value);setMenu(false)}
 const book=(className='green',label='Book Appointment')=><BookingCTA className={className} label={label} onBook={()=>open('booking')}/>
 const pairs=[{before:6,after:7,name:'Cream terrier'},{before:8,after:9,name:'Apricot cockapoo'},{before:10,after:11,name:'Black and white companion'}]
 return <>

 <a className="skip-link" href="#main">Skip to content</a>
 <header ref={headerRef} id="home" className={isGalleryPage ? 'services-header gallery-header' : isInnerPage ? 'services-header' : undefined}><div className="header-inner"><Brand/><nav id="primary-navigation" className={menu?'navigation is-open':'navigation'} aria-label="Main navigation">{['Home','Services','About','Gallery','Blog','Contact'].map(item=>item==='Blog'?<button key={item} onClick={()=>open('blog')}>Blog</button>:<a key={item} className={item===activePage?'active':''} aria-current={item===activePage?'page':undefined} href={item==='Gallery'?'/gallery':item==='About'?'/about':item==='Services'?'/services':item==='Home'?'/':`/#${item.toLowerCase()}`} onClick={()=>setMenu(false)}>{item}</a>)}</nav><div className="header-actions"><a className="phone-link" href={CONTACT.tel} title="Call now" aria-label="Call now: (250) 425-5441"><Icon name="phone"/>(250) 425-5441</a>{book(isInnerPage?'gold header-book':'green header-book','Schedule')}<ThemeToggle theme={theme} onToggle={()=>setTheme(theme==='cream'?'evergreen':'cream')}/><button ref={menuButtonRef} aria-controls="primary-navigation" className="mobile-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} onClick={()=>setMenu(!menu)}><Icon name={menu?'close':'menu'}/></button></div></div></header>
 <main id="main">{isGalleryPage ? <GalleryPage onBook={()=>open('booking')}/> : isAboutPage ? <AboutPage onBook={() => open('booking')}/> : isServicesPage ? <ServicesPage onBook={() => open('booking')}/> : <>
 <section className="hero" aria-labelledby="hero-title"><img src={hero} alt="A happy apricot cockapoo relaxing on a grooming table in a sunlit salon" fetchPriority="high"/><div className="hero-shade"/><div className="hero-inner"><p className="eyebrow">Professional dog grooming & care <span/></p><h1 id="hero-title">Where grooming<br/>meets <em>care.</em></h1><p className="hero-description">Thoughtful, personalized grooming for<br className="desktop-break"/> healthy, happy dogs.</p><div className="hero-buttons">{book()}<a className="button outline" href="/services"><Icon name="play"/>Our Services</a></div></div></section>
 <section className="benefits wrap" aria-label="Our approach">{([{icon:'paw',title:'Experienced Care',text:'Gentle, professional and stress-free.'},{icon:'leaf',title:'Natural Products',text:'Safe, dog-friendly and effective.'},{icon:'heart',title:'Calm Environment',text:'A comfortable space for every dog.'},{icon:'tree',title:'Locally Trusted',text:'Caring for our community’s dogs.'}] as const).map(item=><div className="benefit" key={item.title}><Icon name={item.icon}/><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</section>
 <section className="services wrap" id="services"><Heading subtitle="Tailored grooming and care to keep your dog healthy, comfortable and looking their best.">Our Services</Heading><div className="service-grid">{services.map((s,i)=><button className="service-card" key={s.title} onClick={()=>open(i)}><DogPhoto cell={s.cell} label={s.title} /><div className="service-copy"><span className="service-icon"><Icon name={s.icon}/></span><h3>{s.title}</h3><p>{s.description}</p></div></button>)}</div></section>
 <section className="about" id="about"><Forest/><div className="about-inner"><img src={owner} alt="A caring groomer with a happy golden dog" loading="lazy"/><div className="about-copy"><p className="eyebrow">About Backroad Barkers</p><h2>A Passion for Dogs.<br/>A Commitment to Care.</h2><p>Backroad Barkers was built on a simple idea — that every dog deserves gentle, professional care in a calm and friendly environment.<br/>We treat every dog like family, with patience, respect and genuine care.</p><a className="button gold-outline" href="/about">Learn More<Icon name="arrow"/></a></div></div></section>
 <section className="gallery wrap" id="gallery"><Heading subtitle="Real results from our happy clients.">Before & After</Heading><div className="gallery-layout"><button className="round-button previous" aria-label="Previous transformations" onClick={()=>setGallery((gallery+2)%3)}>‹</button><div className="gallery-grid">{pairs.map((_,i)=>{const p=pairs[(i+gallery)%3];return <div className="photo-pair" key={p.name}><div><DogPhoto cell={p.before} label={`${p.name} before grooming`}/><span>Before</span></div><b aria-hidden="true">›</b><div><DogPhoto cell={p.after} label={`${p.name} after grooming`}/><span>After</span></div></div>})}</div><button className="round-button next" aria-label="Next transformations" onClick={()=>setGallery((gallery+1)%3)}>›</button></div></section>
 <section className="reviews-booking wrap" aria-label="Reviews and appointments"><div className="review"><Icon name="paw" className="review-paw"/><div><h2>What Pet Parents Are Saying</h2><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“Absolutely amazing service! My dog came back happy, clean and looking great. You can tell they truly care about the dogs.”<cite>— Sarah M.</cite></blockquote></div><a className="google-review" href="https://maps.app.goo.gl/9Wa7tNCDTxjmnCxH9" target="_blank" rel="noopener noreferrer" aria-label="Read Backroad Barkers reviews on Google (opens in a new tab)"><div><span className="google-g">G</span><strong>Google<br/>Reviews</strong></div><p><span>★</span> <b>4.9</b> (120+ Reviews)</p></a></div><div className="booking-callout"><Icon name="calendar"/><div><h2>Ready to Book?</h2><p>Give your dog the care they deserve.</p>{book('gold','Book Appointments')}</div><Icon name="paw" className="booking-paw"/></div></section>
 </>}</main>
 <footer id="contact" className={isGalleryPage?'gallery-footer':isInnerPage?'inner-page-footer':undefined}><Forest/><div className="footer-inner wrap"><Brand/><div className="footer-links"><h3>Quick Links</h3><div><a href="/">Home</a><a href="/gallery">Gallery</a><a href="/services">Services</a><button onClick={()=>open('blog')}>Blog</button><a href="/about">About</a><a href="#contact">Contact</a></div></div><div className="contact"><h3>Contact Us</h3><a href={CONTACT.tel} aria-label="Call now: (250) 425-5441"><Icon name="phone"/><span>Call now ? {CONTACT.phone}</span></a><a href={CONTACT.mailto} aria-label="Email info@backroadbarkers.com"><Icon name="mail"/>{CONTACT.email}</a><a href={CONTACT.maps} target="_blank" rel="noopener noreferrer" aria-label="Get directions to 5581 Hwy 31, V0G 1M0 on Google Maps"><Icon name="pin"/>{CONTACT.address}</a></div><div className="social"><h3>Follow Us</h3><div><button aria-label="Instagram details" onClick={()=>open('social')}><Icon name="instagram"/></button><a href="https://www.facebook.com/profile.php?id=61583363224821" target="_blank" rel="noopener noreferrer" aria-label="Backroad Barkers on Facebook (opens in a new tab)"><Icon name="facebook"/></a></div></div></div></footer>
 <div className="mobile-booking-bar" aria-label="Quick contact and booking"><a href="tel:+12504255441" aria-label="Call now: Backroad Barkers at (250) 425-5441"><Icon name="phone"/><span>Call now</span></a><BookingCTA onBook={()=>open('booking')} className="gold" label="Book a visit"/></div>
 <dialog ref={dialog} onCancel={()=>setPanel(null)} onClick={e=>{if(e.target===e.currentTarget)setPanel(null)}} aria-labelledby="dialog-title"><button className="dialog-close round-button" aria-label="Close dialog" onClick={()=>setPanel(null)}><Icon name="close"/></button>{panel==='booking'?<><p className="eyebrow">A little care. A happy tail.</p><h2 id="dialog-title">Let’s book their next visit.</h2><p>Call or email to find an appointment and tell us about your dog’s grooming needs.</p><a className="button green" href="tel:+12504255441"><Icon name="phone"/>Call (250) 425-5441</a><a className="email-link" href="mailto:info@backroadbarkers.com?subject=Grooming%20appointment">info@backroadbarkers.com</a><p className="fine-print">Appointments are confirmed directly with our team.</p></>:typeof panel==='number'?<><p className="eyebrow">Thoughtful care, nose to tail</p><h2 id="dialog-title">{services[panel].title}</h2><p>{services[panel].detail}</p>{book()}</>:panel==='about'?<><p className="eyebrow">About Backroad Barkers</p><h2 id="dialog-title">Gentle hands. A whole lot of heart.</h2><p>We believe grooming should be a comfortable experience. Our approach combines personalized care, dog-friendly products and patient handling.</p><details><summary>How do I book?</summary><p><a href={CONTACT.tel}>Call {CONTACT.phone}</a> or <a href={CONTACT.mailto}>email {CONTACT.email}</a> to arrange your appointment.</p></details><details><summary>What if my dog is nervous?</summary><p>Let us know when booking so we can talk through your dog’s needs and plan a gentle approach.</p></details></>:panel==='blog'?<><p className="eyebrow">The Backroad Journal</p><h2 id="dialog-title">A little care between visits.</h2><p>Our journal is coming soon. For advice about brushing, coat care or your dog’s next grooming visit, get in touch with our team.</p>{book()}</>:<><p className="eyebrow">Stay in touch</p><h2 id="dialog-title">Follow our happy tails.</h2><p>Our Instagram page is coming soon. Follow us on <a href="https://www.facebook.com/profile.php?id=61583363224821" target="_blank" rel="noopener noreferrer">Facebook</a> or reach us at <a href="mailto:info@backroadbarkers.com">info@backroadbarkers.com</a>.</p></>}</dialog>
 </>
}
export default App
