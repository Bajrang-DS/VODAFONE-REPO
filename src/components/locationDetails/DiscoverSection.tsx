import { Link } from '@yext/pages/components';
import * as React from 'react'


// type prop = {
//     discoverSection: any;
// };
const DiscoverSection = (props:any) => {
    const {discoverSection} = props
  return (
   <>
    <div className='m-24'>
    <h2 className='text-center font-bold mx-2 text-[33px]'>Discover More</h2>
       <div className='flex justify-center'>
       { discoverSection.map((data:any, index:any)=>(
        <>
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-2">
          {data.photo.url && data.photo.url != "undefined" && <img key={index + 5} className="w-full" src={data.photo.url} alt="Sunset in the mountains"/>}
         <div className="px-6 py-4">{data.title && data.title != "undefined" &&<div className="font-bold text-xl mb-2">{data.title}</div>}
        {data.uRLs && data.uRLs.map((link:any, index:any)=>(
          link.link && link.link != "undefined" &&  link.label && link.label != "undefined" && <li key={index}><Link href={link.link} eventName={link.label}>{link.label}</Link></li>
        ))}
         </div>
         </div>
        </>
       ))}
       </div>
    </div>
   </>
    // <div>DiscoverSection</div>
  )
}



export default DiscoverSection;
