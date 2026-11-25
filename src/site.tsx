import { Icon } from './components'

export const CONTACT = {phone:'(250) 425-5441',tel:'tel:+12504255441',email:'info@backroadbarkers.com',address:'5581 Hwy 31, V0G 1M0'}
// Set this to the real appointment route once supplied; preserve existing booking meanwhile.
export const APPOINTMENT_URL: string | undefined = undefined
export function BookingCTA({onBook,className='green',label='Book Appointment'}:{onBook:()=>void;className?:string;label?:string}) {
 const content=<><Icon name="calendar"/>{label}<Icon name="arrow"/></>
 return APPOINTMENT_URL ? <a className={`button ${className}`} href={APPOINTMENT_URL}>{content}</a> : <button className={`button ${className}`} onClick={onBook}>{content}</button>
}
export function ThemeToggle({theme,onToggle}:{theme:'cream'|'evergreen';onToggle:()=>void}) {
 return <button className="site-theme-toggle" onClick={onToggle} aria-label={`Switch to ${theme==='cream'?'evergreen':'cream'} theme`} aria-pressed={theme==='evergreen'}><span aria-hidden="true">{theme==='cream'?'◐':'☀'}</span><span>{theme==='cream'?'Evergreen':'Cream'}</span></button>
}
