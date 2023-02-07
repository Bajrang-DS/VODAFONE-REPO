import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from '..//../components/commons/hours';
import Address from "..//../components/commons/Address";
// import phone from "..//../images/phone.svg";
import GetDirection from "../commons/GetDirection";
// import addressicon from "../../images/marker.svg";
// import watch from "../../images/watch.svg";
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import OpenClose from "../commons/openclose";
// import OpenClose from "../commons/openClose";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../types/svgicon";
import Modal from "../commons/servicePopup";
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}
const LocationCard: CardComponent<Location> = ({ result }) => {

  const { address, hours, additionalHoursText, mainPhone, timezone, c_heading } = result.rawData;
  const formattedPhone = formatPhoneNumber(mainPhone);

  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  }

  var url = "";
  var name: any = result.rawData.name.toLowerCase();
  var string: any = name.toString();
  let removeSpecialCharacters = string.replace(
    /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
    "");
  let results: any = removeSpecialCharacters.replaceAll(" ", "-");
  if (!result.rawData.slug) {
    url = `${result.id}-${results}`;
  } else {
    url = `${result.rawData.slug.toString()}`;
  }

  return (
    <div className={`location result`} id={`result-${result.index}`}>
      <div className="relative  w-full">
        <h2  className="onhighLight"><Link eventName="Name" href={`${url}`}><span style={{color:"red"}}>{result.rawData.name}</span></Link></h2>
        <div className="miles "><span className="icon ">{svgIcons.locationmiles}</span> <span style={{color:"green"}}>{metersToMiles(result.distance ?? 0)} mi</span></div>
      </div>

      {/* <p className="text-sm text-slate-700">{address.line1}</p>
      <p className="text-sm text-slate-700">{address.city}, {address.region}, {address.postalCode} </p> */}




      <div className="location-info ">
        <div className="icon-row onhighLight"><Address address={address} /> </div>
        {mainPhone ?
          <div className="icon-row store-phone"> <span className="icon">
            {svgIcons.locatorphoneicon}</span>
            <p><a href={"tel:" + mainPhone}>{formattedPhone} </a></p>
          </div> : ""}
        <div className="open-close ">
          <div className="hours-sec onhighLight">
            <div className="OpenCloseStatus ">
              <div className="hours-labels icon-row">
                <span className="icon">{svgIcons.locationstatus}</span>
                {/* <a className={timeStatus} href="javascript:void(0);" onClick={onOpenHide} >
                  <OpenClose timezone={timezone} hours={hours} deliveryHours={hours}></OpenClose></a> */}
                 <div className="flex" onClick={onOpenHide}>
                 <OpenClose
                    timezone={timezone}
                    hours={hours}
                    deliveryHours={hours}
                  ></OpenClose>
                 <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="9.585" height="4.793" viewBox="0 0 9.585 4.793">
                  <path id="hrd-drop" d="M9,13.5l4.793,4.793L18.585,13.5Z" transform="translate(-9 -13.5)" fill="#00363f"></path>
                 </svg>
                 </div>

              </div>
              <div className={timeStatus + " daylist"} >
                <Hours key={result.rawData.id} hours={hours} additionalHoursText={additionalHoursText} /></div>
            </div>

          </div>
        </div>
      </div>
       <Modal  ourservice={result.rawData.c_ourservice}/>
      <div className="store-link">
        
        {result.rawData.displayCoordinate ?
          <GetDirection label="Direction" buttonText="Direction" address={address} latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude} />
          : <GetDirection label="Direction" address={address} buttonText="Direction" latitude={result.rawData.yextDisplayCoordinate?.latitude} longitude={result.rawData.yextDisplayCoordinate?.longitude} />}
        {/* <button onClick={getDirectionUrl} >getlocation</button> */}
        {/* {result.rawData.c_heading.viewDetails? */}
      
        <Link className="consulation" eventName={"Store Detail"}  href={`${url}`}>
        {svgIcons.storeview}
         Store Detail
       
        </Link>
        {/* :"view details"} */}
      </div>
    </div >
  );
}

export default LocationCard;