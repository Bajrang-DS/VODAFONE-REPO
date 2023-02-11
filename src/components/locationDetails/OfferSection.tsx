import { Link } from '@yext/pages/components';
import * as React from 'react'

type prop = {
  offer: any;
};
const OfferSection = (props: any) => {
  const { offer } = props;
  return (
    <>
    <div>
      <h2 className='text-center font-bold text-2xl'>Come and Choose Your Offer</h2>
      <div className='flex justify-center'>
        {offer.map((OfferItem: any) => (
          
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-6">
              {OfferItem.image.url && OfferItem.image.url != "undefined" && <img className="w-full" src={OfferItem.image.url} alt="Sunset in the mountains" />}
              <div className="px-6 py-4">
                {OfferItem.description && OfferItem.description != "undefined" && <div className="font-bold text-xl mb-2">{OfferItem.description}</div>}
                {OfferItem.details && OfferItem.details != "undefined" && <p className="text-gray-700 text-base">{OfferItem.details}</p>}

                {/* OfferItem.url.link && OfferItem.url.link != "undefined" && OfferItem.url.label && OfferItem.url.label != "undefined" &&  */}

                {/* <div className='mt-4 pb-2'><Link href="#" className='bg-[#FF0000] p-2 text-white'>See Offer</Link></div> */}
              </div>
            </div>
         
        ))}
      </div>
    </div>
     </>
  )
}
export default OfferSection
