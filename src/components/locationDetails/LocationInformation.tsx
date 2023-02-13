// import { t } from "i18next";
import * as React from "react";
import Hours from "../commons/hours";
import CustomMap from "./CustomMap";
import getDirectionUrl from "../commons/GetDirection";
// import map from "../images/map.jpg";
// import favorite from "../images/favorite.svg";
// import justeats from "../images/justeats.svg";
// import uber_eats from "../images/uber-eats.svg";
// import deliveroo from "../images/deliveroo.svg";
import Faq from "../locationDetails/Faqs"
import Service from "./service";
import { Link, useAnalytics } from "@yext/pages/components";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import Holidayhour from "../locationDetails/Holidayhours";
import { svgIcons } from "../../types/svgicon";
import OpenClose from "../commons/openclose";
import { regionNames } from "../commons/Address";
// import OpenClose from "../commons/openClose";
type props = {
  hours: any;
  additionalHoursText: any;
  c_heading: any;
  prop: any;
  coords: any;
  address: any;
  phone: any;
  deliveryHours: any;
  service: any;
  name: any;
  c_ctabutton: any;
  timezone: any;
  c_specificDay:any
};
const LocationInformation = (data: props) => {
  const [time, setTime] = React.useState({});
  const [delHours, setDelHours] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [coordinates, setCoordinate] = React.useState({});
  const [closingTime, setClosingTime] = React.useState("");
  const [address_str, serAddress_str] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentLocationLatLng, setCurrentLocationLatLng] = React.useState(null);
  React.useEffect(() => {
    getString();
    setTime(data.prop);
    setCoordinate(data.coords);
    setDelHours(data.deliveryHours);
    let key: any = Object.values(data.prop)[0];
    if (typeof key.openIntervals != "undefined") {
      setClosingTime(key.openIntervals[0].end);
    }

    setTimeZone(data.timezone);
  })
  function getString() {
    let address_string = "";
    address_string =
      data.address.line1 +
      "," +
      data.address.line2 +
      "," +
      data.address.city +
      "," +
      data.address.region +
      "," +
      data.address.postalCode +
      ",";

    address_string = address_string.replace("undefined,", "");
    serAddress_str(address_string);
  }
  const conversionDetails = {
    cid: "e1cd62c2-74f9-4d8a-ade1-b8e9001c4df4",
    cv: "1",

  };

  const conversionDetails_phone = {
    cid: "17620319-c59b-4719-9732-eaaf0ff35a3a",
    cv: "2",
  };

  let subtitle: any;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  function openModal() {
    document.body.classList.add("overflow-hidden")
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  function handleCloseModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  // const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  // var today = new Date();
  var today:any = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
// let dateFormat3 = today().format('MM-D-YYYY');
// console.log(dateFormat3, "ggggg"); 
  return (
    <>
    <div className="header-title ">
          <h1 className="p-12">{data.name}</h1>
   
        </div>
      <div className="location-information">
        <div className="container mx-auto">
          <div className="w-full text-center pb-4 lg:pb-5">
          </div>
          <div className="boxes">
            <div className="location_details">
              <div className="box store-info">
                <div className="inner-box">
                  <h4 className="font-semibold">Store Info</h4>
                  <div className="store-address">
                    <div className="icon-dtl">

                      {svgIcons.locationaddressicon}
                    </div>
                    <div className=" address-sec ">
                      <h2 className="heading">{data.name}</h2>
                      <p>
                        {data?.address && data.address.line1}, {data.address.line2 && data.address?.line2}
                        <br /> {data.address?.city && data.address.city},{" "} {data.address?.region && data.address.region}, {" "} <br />
                        {data.address?.postalCode && data.address.postalCode}, {data.address?.countryCode &&  regionNames.of(data.address.countryCode)}
                        <br />
                      </p>
                    </div>
                  </div>
                  {data.phone ? (
                    <>
                      <div className="store-phone">
                        {svgIcons.locatorphoneicon}
                        <p>
                          <Link
                            data-ya-track="phone"
                            href={"tel:" + data.phone}
                            rel="noopener noreferrer"
                            eventName={`cta Click:phone"`}
                            conversionDetails={conversionDetails_phone}
                          >
                            {data.phone ? data.phone : ""}
                          </Link>
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
             {data.hours ? <>
          <div className="open-heading">
            <OpenClose timezone={timezone} hours={data.hours} deliveryHours={data.hours}></OpenClose>
          </div></> : <></>
        }
{/* <div><Faq prop={undefined}/></div> */}


                  <div className="store-link w-full">
                    <Link
                      data-ya-track="getdirections"
                      eventName={`getdirections`}
                      className="direction  w-full"
                      onClick={() => getDirectionUrl(data)}
                      href="javascript:void(0);"
                      rel="noopener noreferrer"
                    >
                      {svgIcons.locatorgetdirectionicon} Get Directions
                    </Link>
                    {/* {data.phone ? (
                      <>
                        <Link
                          className="call-store"
                          href={"tel:" + data.phone}
                          eventName={`phone`}
                          conversionDetails={conversionDetails_phone}
                          data-ya-track="phone"
                        >
                          {svgIcons.callstore} Call Store
                        </Link>
                      </>
                    ) : (
                      <></>
                    )} */}
                  </div>
                </div>
              </div>

              <div className="box store-timing">
              <div className="flex justify-between"> 
              {/* <h2 className="text-[1.375rem] ">STORE HOURS</h2>
              <button className="current-location underline hide-mob font-bold " onClick={openModal} > Holiday Hours </button> */}
              </div>
              <div className="inner-box">
                  <div className="hours mb-5">
                    <div className="time-row">
                      <div className="day"></div>

                    </div>
                    {data.hours && data.hours.holidayHours ? (
                      <>
                      {/* <h2 className="text-[1.375rem] ">STORE HOURS</h2> */}
                      {/* {data.hours.holidayHours[0].date >= today ? <button className="current-location underline hide-mob font-bold " onClick={openModal} > Holiday Hours </button>  :console.log("check3 ")} */}
                       
            
                      <Modal
                          onRequestClose={handleCloseModal}
                          shouldCloseOnOverlayClick={false}
                          isOpen={modalIsOpen} style={customStyles}>
                          <a
                            onClick={closeModal}
                            type="button"
                            id="closeButton"
                            data-modal-toggle="allergens-pdf"
                            className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20.953"
                              height="20.953"
                              viewBox="0 0 20.953 20.953"
                            >
                              <path
                                id="Icon_ionic-md-close"
                                data-name="Icon ionic-md-close"
                                d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                                transform="translate(-7.523 -7.523)"
                                fill="#B1B1B1"
                              />
                            </svg>
                          </a>

                          <span className="text-xl font-extrabold">
                            Holiday Hours Calendar
                          </span>
                          <div className="pop-up-holyhrs">
                            <div className="font-bold">Date</div>

                            <div className="font-bold">Day</div>
                            <div className="font-bold"> Opening Hours</div>
                            <div className="font-bold"> Status</div>
                          </div>
                          {data.hours.holidayHours && (
                            <Holidayhour hours={data.hours.holidayHours} c_specificDay={data.c_specificDay}/>
                          )}
                        </Modal>

                      </>
                    ) : (
                      <></>
                    )}
                    {time || delHours ? (
                      <>
                        <h2 className="font-bold"> Hours Info</h2>
                        <Hours
                          hours={time ? time : {}}
                          deliveryHours={delHours ? delHours : {}}
                          timezone={timezone ? timezone : {}}
                          additionalHoursText={data.additionalHoursText}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* {data.c_ctabutton ? (
                    <>
                      {data.c_ctabutton.label && data.c_ctabutton.link ? (
                        <>

                          <a href={
                            data.c_ctabutton.linkType == "URL" ? `${data.c_ctabutton.link}` : data.c_ctabutton.link} className="border-2 text-white bg-[#e36193] border-[#e36193] p-2"
                            target={data.c_ctabutton.linkType == "URL" ? "_self" : data.c_ctabutton.link == "#" ? "_self" : "_blank"}>
                            {data.c_ctabutton ? data.c_ctabutton.label : ""}
                          </a>
                        </>
                      ) : (
                        <></>

                      )}
                    </>
                  ) : (
                    <></>
                  )} */}

                </div>
              </div>
              </div>
            <div className="box map-info">
              <div className="inner-box">
                <CustomMap prop={coordinates} />
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};
export default LocationInformation;
