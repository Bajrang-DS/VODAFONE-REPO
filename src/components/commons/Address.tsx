import * as React from "react";
// import Mapicon from "../../images/pin.svg"; 
import { svgIcons } from "../../types/svgicon";
export const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const Address = (props: any) => {  
    const { address } = props; 
    
  return (
    <>
     <span >{svgIcons.locationaddressicon}</span>
     <div className="address-content onhighLight"><p className="">{address.line1}</p>
            {address.line2 && (<p className="onhighLight">{address.line2}</p>)}
            <p className="onhighLight">{address.city}, {address.region}</p>
            <p className="onhighLight"> {address.postalCode},{regionNames.of(address.countryCode)}</p> </div>       

    </>
  );
};

export default Address;
