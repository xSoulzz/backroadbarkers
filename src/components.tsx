import type { ReactNode } from 'react'
export type IconName = 'paw' | 'phone' | 'calendar' | 'arrow' | 'pin' | 'menu' | 'close' | 'heart' | 'play' | 'leaf' | 'tree' | 'bath' | 'scissors' | 'tooth' | 'brush' | 'mail' | 'instagram' | 'facebook'
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
 const paths: Record<IconName, ReactNode> = {
 paw: <><ellipse cx="7" cy="6" rx="2.5" ry="3.5"/><ellipse cx="16" cy="6" rx="2.5" ry="3.5"/><ellipse cx="3" cy="12" rx="2.3" ry="3"/><ellipse cx="21" cy="12" rx="2.3" ry="3"/><path d="M5 20c0-4 4-9 7-9s7 5 7 9c0 5-5 1-7 1s-7 4-7-1Z"/></>,
 phone: <path d="m5 3 4 4-2 3a15 15 0 0 0 7 7l3-2 4 4c-2 5-7 2-11-1S1 7 5 3Z"/>,
 calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-14 4h2m3 0h2m3 0h1m-11 3h2m3 0h2"/></>,
 arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>, pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
 menu: <path d="M4 6h16M4 12h16M4 18h16"/>, close: <path d="m6 6 12 12M6 18 18 6"/>,
 heart: <path d="M12 21S2 15 2 8c0-6 8-7 10-2 2-5 10-4 10 2 0 7-10 13-10 13Z"/>,
 play: <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="m10 7 7 5-7 5Z" fill="#fff8ef" stroke="none"/></>,
 leaf: <path d="M4 19C-1 7 12 4 21 3c0 12-5 19-16 15M2 22 17 7"/>,
 tree: <path d="m12 1-6 8h4l-6 6h5l-6 6h7v3h4v-3h7l-6-6h5l-6-6h4Z"/>,
 bath: <path d="M2 11h20l-2 8H5Zm3 8-1 3m15-3 1 3M5 11V5a3 3 0 0 1 6 0M8 5h6"/>,
 scissors: <><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8 8 13 13M8 16 21 3m-9 9 2 2"/></>,
 tooth: <path d="M12 4C0-3 3 13 5 20c2 6 3-7 7-7s5 13 7 7C21 13 24-3 12 4Z"/>,
 brush: <path d="m14 3 7 7-6 6-7-7Zm-6 8-6 7a2 2 0 0 0 3 3l7-6M13 6l5 5M11 8l5 5"/>,
 mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/></>,
 instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></>,
 facebook: <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="M14 6h-2c-2 0-2 2-2 3v13m-3-11h8" stroke="#063c2b" strokeWidth="3"/></>,
 }
 return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill={name === 'paw' || name === 'tree' ? 'currentColor' : 'none'} stroke={name === 'paw' || name === 'tree' ? 'none' : 'currentColor'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
export function Brand() {
 return <a className="brand" href="/" aria-label="Backroad Barkers home"><svg className="brand-mark" viewBox="0 0 120 80" aria-hidden="true"><path d="m14 53 24-30 8 7L63 8l19 24 7-9 20 28" fill="none" stroke="#bd760c" strokeWidth="2.5"/><path d="m49 26 14-18 17 22-11-7-6 5-5-9Z" fill="#bd760c"/><g fill="currentColor"><path d="m15 29-6 13h4L6 53h5L3 64h10v9h5v-9h9l-8-11h5l-7-11h4Z"/><path d="m32 41-6 12h4l-7 10h6l-7 10h20l-7-10h5l-6-10h4Zm70-10-6 13h4l-7 11h5l-8 11h10v9h5v-9h9l-8-11h5l-7-11h4Zm-16 12-5 12h3l-6 10h5l-7 8h19l-7-8h5l-6-10h4ZM0 76l31-9 10 3-25 4Zm79-7 16-3 25 11Z"/></g><g fill="#cb810e"><ellipse cx="49" cy="41" rx="4" ry="5.5"/><ellipse cx="60" cy="37" rx="4" ry="5.5"/><ellipse cx="70" cy="42" rx="4" ry="5.5"/><ellipse cx="77" cy="50" rx="3" ry="4.5"/><path d="M46 59c0-6 9-14 14-14s13 8 13 14c0 7-9 2-13 2s-14 5-14-2Z"/></g></svg><span className="brand-name">Backroad<strong>Barkers</strong><small>DOG GROOMING & CARE</small></span></a>
}
export function Forest() {
 return <svg className="forest" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true"><path d="M0 233 150 170 260 203 390 143 530 190 710 151 865 52 940 88 1045 12 1200 111V260H0Z" fill="#63806b" opacity=".28"/><path d="m710 151 155-99 75 36 105-76-60 82-39 14-17-16-68-28-42 49 21-8-32 38Z" fill="#97aa87" opacity=".25"/><path d="m0 239 132-36 162 46 145-28 124 26 163-53 130 20 140-56 204 51v51H0Z" fill="#052c20"/>{Array.from({length:40},(_,i)=>{const x=i*33;const h=35+(Math.sin(i*7)+1)*22+Math.pow(Math.abs(i-20)/20,3)*105;return <path key={i} d={`M${x} ${260-h}l-9 23h5l-13 20h8l-17 25h12l-19 28h28v24h10v-24h24l-17-28h10l-16-25h8l-13-20h5Z`} fill="#00281c"/>})}</svg>
}
