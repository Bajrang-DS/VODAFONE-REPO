import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import { Address } from "@yext/pages/components";
import { svgIcons } from "../../types/svgicon";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import OpenClose from "../commons/openclose";
import Modal from "../commons/servicePopup";
// const metersToMiles = (meters: number) => {
//   const miles = meters * 0.000621371;
//   return miles.toFixed(2);
// }

const metersToMiles = (kilometers: number) => {
  const miles = kilometers * 0.62137119;
  return miles.toFixed(2);
}

type props = {
  prop: any;
  parents: any;
  baseUrl: any;
  coords: any;
  slug: any;
  c_heading: any;
  services:any;

};
const NearByLocation = (entities: props) => {
  const [data, setData] = useState([]);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  useEffect(() => {
    let distance: any = []
    let arr: any = []
    entities.prop.response.distances.map((i: any) => {
      distance.push(i.distanceKilometers)
    })
    entities.prop.response.entities.map((i: any, index: any) => {
      arr.push({
        slug: i.slug,
        address: i.address,
        hours: i.hours,
        geocodedCoordinate: i.geocodedCoordinate,
        mainPhone: i.mainPhone,
        name: i.name,
        yextDisplayCoordinate: i.yextDisplayCoordinate,
        distance: distance[index],
        meta: i.meta.id,
        c_heading: i.c_heading,
        c_ourservice: i.c_ourservice

      })
    })


    setData(arr);
  }, [setData]);
  const conversionDetails = {
    cid: "e1cd62c2-74f9-4d8a-ade1-b8e9001c4df4",
    cv: "1",
  };
  const conversionDetails_phone = {
    cid: "de598c07-b53c-407a-89f8-adc289ae9d62",
    cv: "2",
  };
  function getDirectionUrl(entitiy: any) {
    var origin: any = null;
    if (entitiy.address.city) {
      origin = entitiy.address.city;
    } else if (entitiy.address.region) {
      origin = entitiy.address.region;
    } else {
      origin = entitiy.address.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        // var message_string =
        //   "Unable to determine your location. please share your location";
        // if (confirm(message_string) != true) {
        //   var getDirectionUrl =
        //     "https://www.google.com/maps/dir/?api=1&destination=" +
        //     entitiy.yextDisplayCoordinate.latitude +
        //     "," +
        //     entitiy.yextDisplayCoordinate.longitude +
        //     "&origin=" +
        //     origin;

        //   window.open(getDirectionUrl, "_blank");
        // } else {
        //   return false;
        // }
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          entitiy.yextDisplayCoordinate.latitude +
          "," +
          entitiy.yextDisplayCoordinate.longitude +
          "&origin=" + origin;

        window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            entitiy.yextDisplayCoordinate.latitude +
            "," +
            entitiy.yextDisplayCoordinate.longitude +
            "&origin=" +
            currentLatitude +
            "," +
            currentLongitude;
          window.open(getDirectionUrl, "_blank");
        },
        error,
        {
          timeout: 10000,
        }
      );
    }
  }

  return (
    <>
      <div className="nearby-sec pl-10">
        <div className="container">
          <div className="w-full text-center">
            <h3 className="text-3xl pl-76 font-bold">NEARBY LOCATION </h3>
          </div>
          <Splide
            id="splide-nearby"
            options={{
              rewind: false,

              type: "slide",

              perPage: 3,
              perMove: 2,
              arrows: false,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 2,
                  drag: true,
                  pagination: true,
                  arrows: true,
                  type: "splide",
                },
                575: {
                  arrows: false,
                },
              },
            }}
          >
            
            {data &&
              data.map((e: any, index: any) => {

                var url = "";
                var name: any = e.name.toLowerCase();
                var string: any = name.toString();
                let removeSpecialCharacters = string.replace(
                  /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
                  "");
                let result: any = removeSpecialCharacters.replaceAll(" ", "-");
                if (!e.slug) {
                  url = `${e.meta}-${result}.html`;
                } else {
                  url = `${e.slug.toString()}.html`;
                }

                var origin: any = null;
                if (e.address.city) {
                  origin = e.address.city;
                } else if (e.address.region) {
                  origin = e.address.region;
                } else {
                  origin = e.address.country;
                }

                
                  let addressString = "";
                  let addressLines = e.address?.line1 + e.address?.line2;

                  if (addressLines.length > 42) {
                    addressString += e.address?.line1 + "<br/>";
                    let addressLine = e.address?.line2 + e.address?.city ;
                    if (addressLine.length > 42) {
                      addressString += e.address?.line2 + e.address?.city + "<br />";
                      addressString += e.address?.postalCode  + regionNames.of(e.address?.countryCode);
                    } else {
                      addressString += e.address?.line2  + e.address?.city + "<br />" + e.address?.postalCode ;
                      addressString += regionNames.of(e.address?.countryCode);
                    }

                  } else {
                    let line2 = "";
                    if (e.address?.line2 != undefined) {
                      line2 = " <br/>" + e.address?.line2 + ", ";
                    }
                    addressString += e.address?.line1 + ", " + line2 + "<br />";
                    addressString += e.address?.city + ", " + e.address?.region + "<br />";
                    addressString += e.address?.postalCode + ", " + regionNames.of(e.address?.countryCode);
                  }
                  if(index > 0 ){
                  return (
                    
                    <SplideSlide key={index}>
                      <div className="near-location">
                      <div className="flex flex-row">
                        <h4>
                          <a href={`/${url}`}>{e.name}</a>
                        </h4>
                      

                          <h4 className="pl-20">
                            {metersToMiles(e.distance)} mi
                          </h4>
                        </div>
                        <div className="store-address">
                        <span className="icon">
                    {svgIcons.locationaddressicon}</span>
                          {/* <Address address={e.address} separator={","} lines={[['line1', 'line2', 'city', 'region','postalCode','localizedCountryName']]} ></Address>                           */}
                          <p dangerouslySetInnerHTML={{ __html: addressString }} />
                          {/* <p>
                            {e.address?.line1},  <br />
                            {e.address?.line2}, {e.address?.city}, <br />
                            {e.address?.postalCode}, {regionNames.of(e.address?.countryCode)}
                          </p> */}
                        </div>
            
                        {e.mainPhone ?
                          <div className="phone flex flex-row ">
                          <span className="icon">
                           {svgIcons.locatorphoneicon}</span>
                            <p>
                            
                              <Link
                                data-ya-track="phone"
                                href={`tel:${e.mainPhone}`}
                                rel="noopener noreferrer"
                                conversionDetails={conversionDetails_phone}
                              >
                                {e.mainPhone}
                              </Link>

                            </p>
                          </div>
                          : ""}
                          <div className="phone flex flex-row mt-4">
                          <span className="icon">{svgIcons.locationstatus}</span>
                          <OpenClose
                          timezone={e.timezone}
                          hours={e.hours}
                          deliveryHours={e.hours}
                          ></OpenClose></div>
                         {/* <Modal  ourservice={e.c_ourservice}/> */}
                        <div className="store-link flex flex-row">   
                          <Link
                            data-ya-track="directions"
                            className="direction"
                            eventName="direction"
                            onClick={() => getDirectionUrl(e)}
                            href="javascript:void(0);"
                            rel="noopener noreferrer"
                            conversionDetails={conversionDetails}
                          >
                             <span className="icon">{svgIcons.locatorgetdirectionicon}</span>
                            {" "}
                          
                            Get direction
                          </Link>
                          <Link eventName="DetailPage" className="view-details" href={`/${url}`}>
                            {svgIcons.storeview}{" "}
                            Store Detail
                          </Link>
                        </div>
                      </div>
                    </SplideSlide>
                  );
                          }
                }
              )}
          </Splide>
          
        </div>
        
      </div>
    </>
  );
};
export default NearByLocation;