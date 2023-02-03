import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useRef, useState } from 'react';
import * as React from "react";
import VerticalResults from "../VirticalResult";
import ResultsCount from "./ResultCount";
import { Pagination, LocationBias, NumericalFacets, NumericalFacetsProps, StandardFacets, StandardFacetsProps } from "@yext/search-ui-react";
import FilterSearch from "./FilterSearch";
import { Location } from "..//../types/search/locations";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import Geocode from "react-geocode";
import { useSearchState, Result } from "@yext/search-headless-react";
// import Modal from 'react-modal';
import { AnswerExperienceConfig, googleMapsConfig, limit } from "..//../config/globalConfig";
import Herobanner, { googleApikey } from "../commons/Herobanner";
import logo from "../../images/logo.svg";
import 'react-perfect-scrollbar/dist/css/styles.css';
// import LoadingSpinner from "../commons/loadingspinner";
import LoadingSpinner from "../commons/loadingSpinner";
import $ from "jquery";
// import Geocode from "react-geocode";
import PerfectScrollbar from 'react-perfect-scrollbar';
import useFetchResults from "../../hooks/useFetchResults";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import ViewMore from "./ViewMore";
import { svgIcons } from "../../types/svgicon";
var params1: any = { latitude: 51.4934, longitude: 0.0098 }

const SearchLayout = (item:any): JSX.Element => {
  const[isLoading,setIsloading]= React.useState(true);
  const searchActions = useSearchActions();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // const [centerLatitude, setCenterLatitude] = useState(googleMapsConfig.centerLatitude);
  // const [centerLongitude, setCenterLongitude] = useState(googleMapsConfig.centerLongitude);
  const [inputvalue, setInputValue] = useState('');
  const [check, setCheck] = useState(false);
  type FilterHandle = React.ElementRef<typeof FilterSearch>;
  const filterRef = useRef<FilterHandle>(null);
  const [optionclick, setOptionClick] = useState(true);
  const[allowlocation,setallowLocation]=React.useState('');
  var centerLatitude = 51.4934;
  var centerLongitude = 0.0098;
  
  var searchKey: any;
  let onLoad = true;
  var mapzoom = 8;
  const handleInputValue = () => {
    setInputValue('');
  }
  // useEffect(() => {
  //   searchActions.setVertical(AnswerExperienceConfig.verticalKey);
  //   searchActions.setVerticalLimit(3);
  //   searchActions.executeVerticalQuery();
  // }, []);

  // useEffect(() => {
  //   let searchKey = document.getElementsByClassName('FilterSearchInput');
  //   searchKey[0].addEventListener("keydown", function (e) {
  //     if (e.key == "Enter") {
  //       searchActions.setVertical(AnswerExperienceConfig.verticalKey);
  //       searchActions.setQuery(searchKey[0].value);
  //       searchActions.executeVerticalQuery();
  //     }
  //   })
  //   searchKey[0].addEventListener("keydown", function (e) {
  //     if (searchKey[0].value == "") {
  //       searchActions.setVertical(AnswerExperienceConfig.verticalKey);
  //       searchActions.setQuery("");
  //       searchActions.executeVerticalQuery();
  //     }
  //   })

  //   searchKey[0].addEventListener("keyup", function (e) {
  //     if (searchKey[0].value == "") {
  //       searchActions.setVertical(AnswerExperienceConfig.verticalKey);
  //       searchActions.setQuery("");
  //       searchActions.executeVerticalQuery();
  //     }
  //   })

  // }, []);
  const onLoadData = () => {
    setCheck(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        
        let params: any = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        params1 = params
        mapzoom=3;
        searchActions.setUserLocation(params1);
        searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
        searchActions.executeVerticalQuery();
      }, function (error) {
        if (error.code == error.PERMISSION_DENIED) {   }

      });

    }
    params1 = {
      latitude: 51.4934,
      longitude: 0.0098
    };
    mapzoom=8;
    searchActions.setUserLocation(params1);
    searchActions.setVerticalLimit(AnswerExperienceConfig.limit);
    searchActions.executeVerticalQuery();
    setTimeout(() => {
      setIsloading(false);
      $('body').removeClass("overflow-hidden")
    }, 3100);

  }
  useEffect(() => {
    if (onLoad) {
      onLoadData();
      onLoad = false;
    }
    // bindInputKeyup();
    // handleEnterPress();
    // optionClickHandler(); 
    optionClickHandler();
    if (isLoading) {
      $('body').addClass("overflow-hidden")
    }
  }, []);
  // const onLoadData = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {           
  //       searchActions.setUserLocation({
  //         latitude:position.coords.latitude,
  //         longitude:position.coords.longitude
  //       });
  //       // setCenterLatitude(position.coords.latitude);
  //       // setCenterLongitude(position.coords.longitude);
  //       searchActions.setVerticalLimit(limit);
  //       searchActions.executeVerticalQuery();
  //       }, function(error) {
  //         if (error.code == error.PERMISSION_DENIED){
  //         searchActions.setUserLocation({
  //           latitude:centerLatitude,
  //           longitude:centerLongitude
  //         });
  //         searchActions.setVerticalLimit(limit);
  //         searchActions.executeVerticalQuery();
  //       }

  //       });            
  //   }

  //   searchActions.setUserLocation({
  //     latitude: centerLatitude,
  //     longitude: centerLongitude
  //   });
  //   searchActions.setVerticalLimit(limit);
  //   searchActions.executeVerticalQuery();
  //   setTimeout(() => {
  //     setIsloading(false);
  //     $('body').removeClass("overflow-hidden")
  //   }, 3100);
  // }
 


  const bindInputKeyup = () => {
    searchKey = document.getElementsByClassName('FilterSearchInput');
    if (searchKey.length) {
      searchKey[0].addEventListener("keyup", function (e: any) {
        if (searchKey[0].value.trim() == "") {
          // alert("dsfasdkf")
          setOptionClick(true);
          searchActions.setUserLocation({
            latitude: centerLatitude,
            longitude: centerLongitude
          });
          searchActions.setVertical("locations")
          searchActions.setQuery("");
          searchActions.setVerticalLimit(limit);
          searchActions.executeVerticalQuery();
        }
      })
    }
  }
  const handleEnterPress = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    searchKey[0].addEventListener("keydown", function (e: any) {
      if (e.key == "Enter") {
        console.log('Press enter')
        setOptionClick(false);
        setCheck(true);
        mapzoom = 16;
        getCoordinates(searchKey[0].value);
        document.querySelector('.z-10').classList.add('hidden');
      }
    })
  }

  const optionClickHandler = () => {

    document.body.addEventListener('click', function (e: any) {
      const isOptionClick = getParents(e.target)
      if (isOptionClick) {
        var text = "";
        if (e.target.children.length) {
          for (let index = 0; index < e.target.children.length; index++) {
            text += e.target.children[index].innerText;
          }
          if (text.trim() != "") {
            searchActions.setQuery("");
            searchActions.executeVerticalQuery();
            getCoordinates(text);
          }
        } else {
          text += e.target.innerText;
          if (text.trim() != "") {
            searchActions.setQuery("");
            searchActions.executeVerticalQuery();
            getCoordinates(text);
          }
        }
      }
    });
  }



  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }


  const Findinput = () => {
    let searchKey = document.getElementsByClassName('FilterSearchInput');

    setInputValue('');
    getCoordinates(searchKey[0].value);
  }


  // function getCoordinates(address: String) {
  //   fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18')
  //     .then(response => response.json())
  //     .then(data => {
  //       data.results.map((res: any) => {
  //         const userlatitude = res.geometry.location.lat;
  //         const userlongitude = res.geometry.location.lng;
  //         let params = {
  //           latitude: userlatitude,
  //           longitude: userlongitude
  //         };
  //         setCenterLatitude(userlatitude);
  //         setCenterLongitude(userlongitude);
  //         searchActions.setUserLocation(params);
  //         searchActions.setQuery(address);
  //         searchActions.executeVerticalQuery();

  //       })
  //     })
  // }

  //new
  function getCoordinates(address: String) {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18')
      .then(response => response.json())
      .then(data => {
        if (data.status == "OK") {
          data.results.map((res: any) => {
            const userlatitude = res.geometry.location.lat;
            const userlongitude = res.geometry.location.lng;
            let params = { latitude: userlatitude, longitude: userlongitude };
            setCenterLatitude(userlatitude);
            setCenterLongitude(userlongitude);
            searchActions.setUserLocation(params);
            searchActions.setQuery(address);
            searchActions.executeVerticalQuery();
          })
        } else {
          console.log('OK');
          searchActions.setUserLocation({ latitude: centerLatitude, longitude: centerLongitude });
          searchActions.setQuery(address);
          searchActions.executeVerticalQuery();
        }

      })
  }
  const locationResults = useFetchResults() || [];

  const locationBias = useSearchState(s => s.location.locationBias);
  const displayName = locationBias?.displayName;

  // const getUsersLocation = () => {
  //   if (navigator.geolocation) {

  //     const error = (error: any) => {
  //       if (error.code == 1) {
  //         setInputValue('Please allow your Location');
  //       } else {
  //         setInputValue('Please allow your Location');
  //       }
  //     }

  //     navigator.geolocation.getCurrentPosition(function (position) {

  //       Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
  //       Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
  //         (response: any) => {
  //           if (response.results[0]) {
  //             setInputValue(response.results[0].formatted_address);

  //             setTimeout(function () {
  //               document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);
  //             }, 1000);

  //             searchActions.setUserLocation({
  //               latitude: position.coords.latitude,
  //               longitude: position.coords.longitude,
  //             });

  //             setCenterLatitude(position.coords.latitude);
  //             setCenterLongitude(position.coords.longitude);
  //             searchActions.setVertical(AnswerExperienceConfig.verticalKey);
  //             searchActions.setQuery('');
  //             searchActions.executeVerticalQuery();
  //           }

  //         },
  //         (error: any) => {
  //         }
  //       );
  //     },
  //       error, {
  //       timeout: 10000,
  //     });

  //   }
  // }
  // const getUsersLocation = () => {

  //   if (navigator.geolocation) {
  //    const error=(err:any)=>{
  //     setallowLocation('Please allow your Location')
  //    }

    
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     // setcurrrentCordinate({lat:position.coords.latitude,lng: position.coords.longitude})
  //     Geocode.setApiKey(googleApikey);
  //     Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
  //       (response: any) => {
  //         if (response.results[0]) {
  //           //  $('.FilterSearchInput').attr("placeholder",'ghfdhfh');
  //           // document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);
  //           setInputValue(response.results[0].formatted_address);
  //           setTimeout(function () {
  //             document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);
  //           }, 1000);
  //           setInputValue(response.results[0].formatted_address);
  //           setallowLocation('');
  //         }
  //       },
  //       (error: any) => {
  //         setCheck(false);
  //       }
  //     );

  //     let params = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     };
  //     centerLatitude = position.coords.latitude;
  //     centerLongitude = position.coords.longitude;
  //     mapzoom=3;
  //     searchActions.setUserLocation(params);
  //     searchActions.executeVerticalQuery();

  //   },error)
  // }




  // }

  // const getUsersLocatio = () => {

  //   if (navigator.geolocation) {
  //     // setallowLocation('Please allow your Location')
  //     const error=(err:any)=>{
  //       setallowLocation('Please allow your Location')
  //      }

  //   }
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     // setcurrrentCordinate({lat:position.coords.latitude,lng: position.coords.longitude})
  //     Geocode.setApiKey(googleApikey);
  //     Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
  //       (response: any) => {
  //         if (response.results[0]) {

  //           //  $('.FilterSearchInput').attr("placeholder",'ghfdhfh');
  //           // document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);

  //           setInputValue(response.results[0].formatted_address);
  //           setallowLocation('');
  //         }
  //       },
  //       (error: any) => {
  //         setCheck(false);
  //       }
  //     );

  //     let params = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     };
  //     centerLatitude = position.coords.latitude;
  //     centerLongitude = position.coords.longitude;
  //     mapzoom=3;
  //     searchActions.setUserLocation(params);
  //     searchActions.executeVerticalQuery();
  //   },error)
  // }

  const getUsersLocation = () => {

    if (navigator.geolocation) {
     const error=(err:any)=>{
      setallowLocation('Please allow your Location')
     }
    navigator.geolocation.getCurrentPosition(function (position) {
      // setcurrrentCordinate({lat:position.coords.latitude,lng: position.coords.longitude})
      Geocode.setApiKey(googleApikey);
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        (response: any) => {
          if (response.results[0]) {
            //  $('.FilterSearchInput').attr("placeholder",'ghfdhfh');
            // document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);
            // setInputValue(response.results[0].formatted_address);
            filterRef.current && filterRef.current.setInputValue(response.results[0].formatted_address);
            setallowLocation('');
          }
        },
        (error: any) => {
          console.error(error);
          setCheck(false);
        }
      );
      let params = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      centerLatitude = position.coords.latitude;
      centerLongitude = position.coords.longitude;
      mapzoom=3;
      searchActions.setUserLocation(params);
      searchActions.executeVerticalQuery();

    },error)
  }




  }
  const getParents = (elem: any) => {
    while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
      elem = elem.parentNode;
      if (elem.classList.contains('options')) {
        return true;
      }
    }
    return false;
  }
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
  // const loader=isLoading ?<LoadingSpinner />:'';
  const loader = isLoading ? <LoadingSpinner /> : '';

  return (
    <>
    {loader}
        
       {/* <div className="logo">
              {<a href="#" className="">
                <img src={logo} alt="Well pharmacy" title="Well" />
              </a> }
            </div> */}

      {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} >
        <StandardFacets />
      </Modal> */}
      {/* <div>hffhfhfhfhh</div> */}
      {/* <div>hffhfhfhfhh</div> */}
     
      <div className=" mx-auto px-9 w-full">
        <div className="breadcrumb">
          <div className="boxes">
            <ul>
              <li>
                <a href="#" className="disabled pointer-events-none"> <svg xmlns="http://www.w3.org/2000/svg" width="15.294" height="13" viewBox="0 0 15.294 13">
                  <path id="Icon_material-home" data-name="Icon material-home"
                    d="M9.118,17.5V12.912h3.059V17.5H16V11.382h2.294L10.647,4.5,3,11.382H5.294V17.5Z"
                    transform="translate(-3 -4.5)" fill="#3A356D" />
                </svg>Home</a>
              </li>
              {/* <li><img src={arrowforword} id=""/> </li> */}
              <li>Store Locator</li>
            </ul>
            <div className="flex justify-between px-6 ">
          {/* <FilterAwesome></FilterAwesome> */}
          <button className="current-location hide-mob" title="Search using your current location!" id="useLocation" onClick={getUsersLocation}>
           Use my location</button>
          
           
           {/* {allowlocation.length > 0 ?
          <div className="for-allow">{allowlocation}</div>
          : ''} */}
        </div>
          </div>
        </div>
        
      </div>
       {allowlocation.length > 0 ?
          <div className="for-allow ml-6 text-red">{allowlocation}</div>
          : ''}
          
      <div className=" mx-auto px-6 w-full xl:h-screen flex flex-col max-h-full xl:max-h-screen">
        <div className="row flex flex-row w-full h-full">
          
          <div className="left-block-locator">
          <div className="locator-find-block">
        <div className="search-form">
        <div className="search-field"><button
            className="cus_btn search-submit"
            aria-label="Search bar icon"
            id="search-location-button" onClick={Findinput}>
            {svgIcons.findouticon}
          </button>
            <FilterSearch
             ref={filterRef}
              customCssClasses={{
                filterSearchContainer: "m-2",
                inputElement: "FilterSearchInput",
                optionsContainer: "options"
              }}
              inputvalue={inputvalue}
              params={params1}
              searchOnSelect={false}
              searchFields={[
                {
                
                  entityType: "location",
                  fieldApiName: "name",
                },
                {
                  entityType: "location",
                  fieldApiName: "address.city",
                  

                  },
                  {
                    entityType: "location",
                    fieldApiName: "address.line1",

                },
                {
                  entityType: "location",
                  fieldApiName: "address.postalCode",

                },
                // {
                //   entityType: "location",
                //   fieldApiName: "address.region",

                //   }
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.countryCode",

                  // },
                ]}
                
                handleInputValue={handleInputValue}  
            />

            <button
              className="search-btn"
              aria-label="Search bar icon"
              id="search-location-button" onClick={Findinput}><div dangerouslySetInnerHTML={{ __html: "" }} /></button>
          </div>
          
        </div>

        
      </div>

            <div className="sticky top-0 z-0 bg-slate-50 border-b border-slate-300">

              <ResultsCount
                customCssClasses={{ resultsCountContainer: "mx-2 my-0" }}
              />
            </div>
            {/* <div className=" overflow-y-auto   min-h-[calc(100vh_-_200px)]  max-h-[calc(100vh_-_200px)]  ">  */}
            <PerfectScrollbar className="result-list">
              <div>
                {/* {locationResults && locationResults.length > 0 ? (
                  <VerticalResults<Location>
                    displayAllOnNoResults={false}
                    customCssClasses={{
                      verticalResultsContainer:
                        "flex flex-col divide-y divide-slate-300 result-list-inner ",
                    }}
                    CardComponent={LocationCard}
                  />
                ) : ( */}
                     {locationResults && locationResults.length > 0 ? (
              <div className="scrollbar-custom">
           
              <VerticalResults
                displayAllOnNoResults={false}                
                CardComponent={LocationCard}
                locationResults={locationResults}
                // customCssClasses={{verticalResultsContainer:"resultList mb-5 result-list-inner"}}
              />
               </div>
             
            ) : (
                  <div className="p-4 bg-white">
                    <p>No Location found.</p>
                    {/* {loader} */}
                  </div>
                )
                }
                 <ViewMore className={"button view-more"} idName={"view-more-button"} buttonLabel={"View More"} />
                {/* <div className="pagination-bottom"> <Pagination /> </div> */}
                {/* </div> */}
                
              </div>
            </PerfectScrollbar>
          </div>         
          <div className="right-block-locator">
            {/* <MapboxMap<Location>
                    mapboxAccessToken="pk.eyJ1IjoicmFodWxyYXRob3JlIiwiYSI6ImNsOGVoM2NycjFsMDYzbnFrdGlpbGE4djEifQ.IWRyhB7OIqpBdtUtj0ki_w"
                    getCoordinate={(location) =>
                    location.rawData.yextDisplayCoordinate}
                    PinComponent={MapPin}
                /> */}

            <GoogleMaps
              apiKey={googleMapsConfig.googleMapsApiKey}
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              defaultZoom={mapzoom}
              showEmptyMap={true}
            />
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </>
  );
};

export default SearchLayout;