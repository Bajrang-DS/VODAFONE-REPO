
import * as React from "react";
import {Link} from "@yext/pages/components";

type Cta = {
  buttonText: string;
  address :any;
  latitude?: number;
  longitude?: number;
  label:any;
};

const GetDirection = (props: Cta) => {
  const { 
    buttonText, 
    label
  } = props;


  const getDirectionUrl = () => {
    var origin: any = null;
    if (props.address.city) {
      origin = props.address.city;
    } else if (props.address.region) {
      origin = props.address.region;
    }  else {
      origin = props.address.country;
    }
    if (navigator.geolocation) {
      const error = (error: any) => {
        var getDirectionUrl =
        "https://www.google.com/maps/dir/?api=1&destination=" +
		props. latitude +
        "," +
        props.longitude +
        "&origin=" +
        origin;

      window.open(getDirectionUrl, "_blank");
      };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let currentLatitude = position.coords.latitude;
          let currentLongitude = position.coords.longitude;
          let getDirectionUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
			props.latitude +
            "," +
			props. longitude +
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
  };

  return (
    <>   
   <Link eventName="GetDirection" onClick={getDirectionUrl} href="javascript:void(0);" className="direction" rel="noopener noreferrer" > 
   <svg id="directions" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path id="Path_16" data-name="Path 16" d="M0,0H24V24H0Z" fill="none"></path>
		<path id="Path_17" data-name="Path 17" d="M22.43,10.59,13.42,1.58a2.051,2.051,0,0,0-2.83,0l-9,9a1.992,1.992,0,0,0,0,2.82l9,9a2,2,0,0,0,2.82,0l8.99-8.99A1.992,1.992,0,0,0,22.43,10.59ZM12.01,20.99l-9-9,9-9,9,9ZM8,11v4h2V12h4v2.5L17.5,11,14,7.5V10H9A1,1,0,0,0,8,11Z"></path>
	</svg>{label}
  </Link>
    </>

  );
};

export default GetDirection;