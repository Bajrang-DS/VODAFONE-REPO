import { Wrapper } from '@googlemaps/react-wrapper';
// import { Result, useAnswersState } from '@yext/answers-headless-react';
import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { twMerge, useComposedCssClasses } from '..//../hooks/useComposedCssClasses';
import mapicon from "..//../images/placeholder.png";
// import Groupnear from "..//../images/Groupnear.png";
import Groupnear from "..//../images/vodafone-favIcon.ico"
import phone from "..//../images/phone.svg";
import GetDirection from "../commons/GetDirection";
import cluster from "../../images/cluser.png"
import MapiconHover from "..//../images/markehover.png";
// import Hours from '..//../components/commons/hours';
import Hours from '..//../components/commons/hours';
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import OpenCloseStatus from '../commons/OpenCloseStatus';
import Address from '../commons/Address';
// import OpenClose from '../commons/openClose';
import { svgIcons } from '../../types/svgicon';
import OpenClose from '../commons/openclose';
import useFetchResults from '../../hooks/useFetchResults';
import { Link } from '@yext/pages/components';
// import Phone from '../commons/phone';
/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string
}


/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void } | null = null;
let openInfoWindow = false;


const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer:
    "w-full  h-48 md:h-96 lg:h-[calc(100vh_-_9.375rempx)] top-0   2xl:h-[calc(100vh_-_9.375rem)] order-1 lg:order-none z-[99]",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <Wrapper apiKey={props.apiKey}>
        <UnwrappedGoogleMaps {...props} />
      </Wrapper>
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  providerOptions,
  customCssClasses
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [center] = useState<google.maps.LatLngLiteral>({
    lat: centerLatitude,
    lng: centerLongitude
  });
   const locationResults = useFetchResults() || [];
  // const userlat = useSearchState(s => s.location.locationBias) || [];

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;
  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, 'hidden');
  }
  let pinStyles = {
    fill: "#4e9c34", //default google red
    stroke: "#4e9c34",
    text: "white",
    fill_selected: "#2c702e",
    stroke_selected: "#4e9c34",
    text_selected: "white",
  };

  let marker_icon = {
    // default google pin path
    /*path: "M18.942,56.14C2.965,32.568,0,30.149,0,21.486A21.3,21.3,0,0,1,21.111,0,21.3,21.3,0,0,1,42.222,21.486c0,8.663-2.965,11.082-18.942,34.654a2.614,2.614,0,0,1-4.339,0Zm2.17-25.7a8.954,8.954,0,1,0-8.8-8.953A8.875,8.875,0,0,0,21.111,30.439Z",*/
    url: mapicon,
    fillColor: pinStyles.fill,
    scale: 0.8,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };
  //new
  let marker_hover_icon = {
    url: MapiconHover,
    fillColor: pinStyles.fill,
    scale: 0.8,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };
  let openMapCenter = null;
  let openMapZoom = null;
  let searchCenter:any = null;
  let searchZoom:any = null;
  let stopAnimation = false;
  let currentMapZoom = 0;
  // let infoWindow = new google.maps.InfoWindow();
  function zoomMapTo(zoomTo, centerToSet = false) {
    currentMapZoom = map.getZoom();
    let newZoom = (currentMapZoom > zoomTo) ? (currentMapZoom - 1) : (currentMapZoom + 1);
    map.setZoom(newZoom);
    if (newZoom != zoomTo && !stopAnimation) sleep(100).then(() => {
      zoomMapTo(zoomTo, centerToSet);
    });
    if (newZoom == zoomTo) {
      stopAnimation = false;
      if (centerToSet) {
        if (typeof map.panTo != 'undefined') {
          map.panTo(centerToSet);
        } else {
          map.setCenter(centerToSet);
        }
      }
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  const infoWindow =useRef(new google.maps.InfoWindow());

  deleteMarkers();
  userdeleteMarkers();


  const userlat = useSearchState(s => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: iplat,
    lng: iplong,
  }

  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: Groupnear,
  });
  usermarker.current.push(Usermarker1);

  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) { }
  let index = 0;
  for (const result of locationResults) {
    const position = getPosition(result);
    let markerLabel = Number(index + 1);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
      // label: {
      //   text: String(markerLabel),
      //   color: "#fff",
      // },
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markerPins.current.push(marker);
    index++;
  }


  if (markerPins.current.length > 0) {
    let markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({ map, markers });
  }
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          styles: [
            {
              "featureType": "administrative",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ],
          ...providerOptions,
        })
      );
    }
  }, [center, map, providerOptions, zoom]);

  useEffect(() => {
    if (markerPins.current.length > 0 && map) {
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(center);
      bounds.extend(position);
      map.fitBounds(bounds);
      map.setZoom(8);
      // const zoom = map.getZoom() ?? 0;
      if(markerPins.current.length > 2){
        map.setZoom(6);
      }
      if (zoom > 12) {
        map.setZoom(6);
      }
      searchCenter = bounds.getCenter();
      searchZoom = map.getZoom();
    }
    //listing hover and click marker should be highlight and infowindow open
    gridHover(markerPins, marker_hover_icon, marker_icon);
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("click", (e) => {
        // let removeResult = document.getElementById(`result-${index}`)
        if((e.target as HTMLElement).classList.contains("onhighLight")){ 
          // alert("aleert2")
        infoWindow.current?.close();
        // alert("get")
        //    alert('Hello'); 
        // if (!openInfoWindow) {
        //   openMapZoom = map.getZoom();
        //   openMapCenter = map.getCenter();
        // }

        locationResults.map((result, r) => {
          if (index == r) {
            Infowindow(index, result);
            addActiveGrid(index);
            map.panTo(markerPins.current[index].getPosition());
            infoWindow.current.open(map, markerPins.current[index]);
            openInfoWindow = true;
          }
          map.setZoom(20);
        })
        //  }
    }});
    }
    Hover(markerPins, marker_hover_icon, marker_icon);

    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("click", (e) => {
        // let removeResult = document.getElementById(`result-${index}`)
        if((e.target as HTMLElement).classList.contains("onhighLight")){
          // alert("alert")
          infoWindow.current.close();
        // alert("dfjgj")
        //    alert('Hello');
        if (!openInfoWindow) {
          openMapZoom = map.getZoom();
          openMapCenter = map.getCenter();
        }

        locationResults.map((result, r) => {
          if (index == r) {
            Infowindow(index, result);
            ActiveGrid(index);
            map.panTo(markerPins.current[index].getPosition());
            infoWindow.current.open(map, markerPins.current[index]);
            openInfoWindow = true;
          }
          map.setZoom(15);
        })
        //  }
    }});
    }
  });

  //click on map marker info window open
  for (let i = 0; i < markerPins.current.length; i++) {
    markerPins.current[i].addListener("click", () => {
      infoWindow.current.close();
      if (!openInfoWindow) {
        openMapZoom = map.getZoom();
        openMapCenter = map.getCenter();
      }

      locationResults.map((result, index) => {
        if (i == index) {
          Infowindow(i, result);
          scrollToRow(index);
          ActiveGrid(index);
        }
        map.setZoom(14);
        map.panTo(markerPins.current[i].getPosition());
        infoWindow.current.open(map, markerPins.current[i]);
        openInfoWindow = true;
      })


    })

    //on mouseover maker change 
    markerPins.current[i].addListener("mouseover", () => {
      markerPins.current[i].setIcon(marker_hover_icon);
      addActiveGrid(i);
    })

    // on mouseout marker change
    markerPins.current[i].addListener("mouseout", () => {
      // removeActiveGrid()
      // removeActiveGrid()
      markerPins.current[i].setIcon(marker_icon);
      let markerLabel = Number(i + 1);
      markerPins.current[i].setLabel({
        text: markerLabel,
        color: "#fff",
      });
      if(!openInfoWindow){
        removeActiveGrid();
      }
    })
  }

  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };


  //new
  //on close icon info window close
  google.maps.event.addListener(infoWindow.current, 'closeclick', function() {
    infoWindow.current.close();
       map?.setZoom(8)
    //  zoomMapTo(6, searchCenter);
    removeActiveGrid();
   
    // map.setZoom(8);
    // bounds.extend(center);
    openInfoWindow = false;
  });
  // infoWindow.current.addListener("closeclick", () => {
  //   // setHover(true);
  //   // info=false;
  //   infoWindow.current.close();
  //   locationResults.map((result, index) => {

  //     let resultelement = document.querySelectorAll(`.result-list-inner-${index + 1}`);
  //     for (let index = 0; index < resultelement.length; index++) {

  //       resultelement[index].classList.remove('active');
  //       resultelement[index].classList.remove('fixed-hover');


  //     }
  //   })
  //   //  map.setZoom(8);
  //   // infoWindow.close(); 
  //   // bounds.extend(mapCenter);         
  // });

  /**
   * infowindow html data call
   * @param i 
   * @param result 
   */
   function Infowindow(i: Number, result: any): void {
    var url = "";
    var name: any = result.rawData.name.toLowerCase();
    var string1: any = name.toString();
    let removeSpecialCharacters = string1.replace(
      /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
      "");
    let results: any = removeSpecialCharacters.replaceAll(" ", "-");
    if (!result.rawData.slug) {
      url = `${result.id}-${results}.html`;
    } else {
      url = `${result.rawData.slug.toString()}.html`;
    }
    const MarkerContent =
      (
        <div className={`location result`} id={`result-${result.index}`}>
        <div className="relative w-full">
          <h3><a href={`${result.rawData.slug}.html`}>{result.rawData.name}</a></h3>
          <div className="miles"><span className="icon">{svgIcons.locationmiles}</span> {metersToMiles(result.distance ?? 0)} mi</div>
        </div>


        <div className="location-info">
          <div className="icon-row"><Address address={result.rawData.address} /> </div>
          {result.rawData.mainPhone &&<div className="icon-row"> <span className="icon">{svgIcons.locatorphoneicon}</span><a href={"tel:" + result.rawData.mainPhone}>{result.rawData.mainPhone} </a></div>}
          
         {result.rawData.hours &&  <div className="open-close">
            <div className="hours-sec ">
              <div className="OpenCloseStatus ">
                <div className="hours-labels icon-row">
                  <span className="icon">{svgIcons.locationstatus}</span>
                  <a className={result.rawData.timeStatus} href="javascript:void(0);">
                    <OpenClose timezone={result.rawData.timezone} hours={result.rawData.hours} deliveryHours={result.rawData.hours}></OpenClose></a>
                </div>
              </div>
            </div>
          </div>}
        </div >
        {/* <div className="store-link">
        
        {result.rawData.displayCoordinate ?
          <GetDirection label="Direction" buttonText="Direction" address={result.rawData.address} latitude={result.rawData.displayCoordinate?.latitude} longitude={result.rawData.displayCoordinate?.longitude} />
          : <GetDirection label="Direction" address={result.rawData.address} buttonText="Direction" latitude={result.rawData.yextDisplayCoordinate?.latitude} longitude={result.rawData.yextDisplayCoordinate?.longitude} />}
      
      
        <Link className="consulation" eventName={"Store Detail"}  href={`${url}`}>
        {svgIcons.storeview}
        Store Detail
        </Link>
      </div> */}
      </div>
      ); 

    let string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);

  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }

  return <div className={containerCssClass} ref={ref} />;
}

// TEMPORARY FIX
// / eslint-disable @typescript-eslint/no-explicit-any /
function getPosition(result: Result) {
  const lat = (result.rawData as any).yextDisplayCoordinate.latitude;
  const lng = (result.rawData as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}

//new
function removeActiveGrid() {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove('active')
  }
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove('highLight')
  }
}

function gridHover(markerPins: any, marker_hover_icon: any, marker_icon: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].addEventListener("mouseover", () => {
      markerPins.current[index].setIcon(marker_hover_icon);
      addActiveGrid(index);
    });
    elements[index].addEventListener("mouseout", () => {
      markerPins.current[index].setIcon(marker_icon);
      // addActiveGrid(index);
      // removeActiveGrid()
      if(!openInfoWindow){
        removeActiveGrid();
      }
      // if(inf)

      // elements.
      // elements.classList.remove("mystyle");

    });
  }
}
function Hover(markerPins: any, marker_hover_icon: any, marker_icon: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].addEventListener("click", () => {
      markerPins.current[index].setIcon(marker_hover_icon);
      ActiveGrid(index);
    });
    elements[index].addEventListener("mouseout", () => {
      markerPins.current[index].setIcon(marker_icon);
    });
  }
}
function addActiveGrid(index: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove('active')
  }
  document.querySelectorAll(".result")[index].classList.add("active");
}


function ActiveGrid(index: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove('highLight')
  }
  document.querySelectorAll(".result")[index].classList.add("highLight");
}
export function scrollToRow(index: any) {
  let result = [].slice.call(document.querySelectorAll(".result") || [])[0];
  let offset = 0;
  if (typeof [].slice.call(document.querySelectorAll(".result") || [])[index] != 'undefined') {
    offset = [].slice.call(document.querySelectorAll(".result") || [])[index].offsetTop - result.offsetTop;
    [].slice.call(document.querySelectorAll(".result-list") || []).forEach(function (el) { el.scrollTop = offset; });
  }
}
