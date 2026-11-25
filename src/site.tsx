import { Icon } from './components'

export const CONTACT = {phone:'(250) 425-5441',tel:'tel:+12504255441',email:'info@backroadbarkers.com',address:'5581 Hwy 31, V0G 1M0',maps:'https://www.google.com/maps/dir/?api=1&destination=5581%20Hwy%2031%2C%20V0G%201M0%2C%20Canada',mailto:'mailto:info@backroadbarkers.com'}
// Set this to the real appointment route once supplied; preserve existing booking meanwhile.
export const APPOINTMENT_URL: string | undefined = undefined
export function BookingCTA({onBook,className='green',label='Book Appointment'}:{onBook:()=>void;className?:string;label?:string}) {
 const content=<><Icon name="calendar"/>{label}<Icon name="arrow"/></>
 return APPOINTMENT_URL ? <a className={`button ${className}`} href={APPOINTMENT_URL}>{content}</a> : <button className={`button ${className}`} onClick={onBook}>{content}</button>
}
export function ThemeToggle({theme,onToggle}:{theme:'cream'|'evergreen';onToggle:()=>void}) {
 return <div className="theme-selector" role="group" aria-label="Day and night preference">
  <button type="button" aria-label="Day" title="Day" aria-pressed={theme==='cream'} onClick={()=>{if(theme!=='cream')onToggle()}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button>
  <button type="button" aria-label="Night" title="Night" aria-pressed={theme==='evergreen'} onClick={()=>{if(theme!=='evergreen')onToggle()}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z"/></svg></button>
 </div>
}
