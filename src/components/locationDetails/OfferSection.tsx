import { Link } from '@yext/pages/components';
import * as React from 'react'

type prop = {
    offer: any;
};
const OfferSection = (props: any) => {
    const { offer } = props;
  return (
   <div>
    <h2 className='text-center font-bold text-2xl'>Come and Choose Your Offer</h2>
    <div className='flex justify-center'>
         {offer.map((OfferItem:any)=>(
             <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-6">
    {OfferItem.photo.url && OfferItem.photo.url != "undefined" && <img className="w-full" src={OfferItem.photo.url} alt="Sunset in the mountains" /> }           
    <div className="px-6 py-4">
    {OfferItem.title && OfferItem.title != "undefined" &&<div className="font-bold text-xl mb-2">{OfferItem.title}</div>}
    {OfferItem.description && OfferItem.description != "undefined"&&<p className="text-gray-700 text-base">{OfferItem.description}</p>}
    {OfferItem.url.link && OfferItem.url.link != "undefined" && OfferItem.url.label && OfferItem.url.label != "undefined" && <div className='mt-4 '><Link href={OfferItem.url.link} eventName={OfferItem.url.label} className='bg-[#FF0000] p-2 text-white'>{OfferItem.url.label}</Link></div>}
  </div> 
  </div>
  </>    
    ))}
    </div>
    </div>
  )
}
export default OfferSection
