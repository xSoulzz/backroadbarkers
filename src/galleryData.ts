export const filters = ['All','Before & After','Grooming','Bathing','Dental','Happy Clients','Behind the Scenes'] as const
export type GalleryFilter = typeof filters[number]
export type GalleryEntry = {id:string;file:string;alt:string;category:Exclude<GalleryFilter,'All'|'Before & After'>;comparison:boolean;src?:string}
// Original supplied images, in attachment order; the repeated black-dog comparison is omitted.
export const galleryManifest: GalleryEntry[] = [
 {id:'01',file:'01-before.png',alt:'Cream curly-coated dog standing on a grooming table before a haircut.',category:'Grooming',comparison:false},
 {id:'02',file:'02-after.png',alt:'Cream dog with a trimmed coat sitting on the grooming table.',category:'Grooming',comparison:false},
 {id:'03',file:'03-happy-client.png',alt:'Freshly groomed cream dog wearing a red checked bandana.',category:'Happy Clients',comparison:false},
 {id:'04',file:'04-cream-comparison.png',alt:'Side-by-side views of a cream curly-coated dog before and after grooming.',category:'Grooming',comparison:true},
 {id:'05',file:'05-black-comparison.png',alt:'Side-by-side views of a small black and white dog before and after grooming.',category:'Grooming',comparison:true},
 {id:'07',file:'07-dental-comparison.png',alt:'Close-up comparison of a dog’s teeth with gloved hands holding the mouth open.',category:'Dental',comparison:true},
 {id:'08',file:'08-apricot-comparison.png',alt:'Side-by-side views of an apricot puppy on a grooming table and outdoors.',category:'Grooming',comparison:true},
 {id:'09',file:'09-car-comparison.png',alt:'Side-by-side views of an apricot dog in a car before and after grooming.',category:'Grooming',comparison:true},
 {id:'10',file:'10-poodle-comparison.png',alt:'Side-by-side views of an apricot poodle before and after a haircut.',category:'Grooming',comparison:true},
 {id:'11',file:'11-black-white-comparison.png',alt:'Side-by-side views of a black and white dog with a shaggy coat and a trimmed coat.',category:'Grooming',comparison:true},
 {id:'12',file:'12-red-comparison.png',alt:'Side-by-side views of a reddish curly-coated dog before and after grooming.',category:'Grooming',comparison:true},
 {id:'13',file:'13-gray-comparison.png',alt:'Side-by-side views of a gray dog before and after facial grooming.',category:'Grooming',comparison:true},
 {id:'14',file:'14-cream-closeup.png',alt:'Side-by-side close-up views of a cream dog before and after a haircut.',category:'Grooming',comparison:true},
 {id:'15',file:'15-bathing.png',alt:'Wet cream dog standing in a stainless steel grooming bath with a black ear wrap.',category:'Bathing',comparison:false},
 {id:'16',file:'16-salon-collage.png',alt:'Three intact photos of a small dog during grooming, including a bath with foam.',category:'Behind the Scenes',comparison:false},
]
export function filterEntries(entries:GalleryEntry[],filter:GalleryFilter) {
 return entries.filter(entry=>filter==='Dental'?entry.category==='Dental':entry.category!=='Dental'&&(filter==='All'||(filter==='Before & After'?entry.comparison:entry.category===filter)))
}
export function nextIndex(current:number,direction:number,count:number) {return count ? (current+direction+count)%count : 0}
