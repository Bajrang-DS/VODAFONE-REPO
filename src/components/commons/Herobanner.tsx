import * as React from "react";
import FilterAwesome from "../locatorPage/Filter";
import { FilterSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from 'react';
// import googlea
import { AnswerExperienceConfig, googleMapsConfig, } from "..//../config/globalConfig";
import Geocode from "react-geocode";
import { svgIcons } from "../../types/svgicon";
import { Staticdata } from "../../types/constants";
export const googleApikey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";


const Herobanner = (props:any) => {
  return (
    <>
    {props.c_bannerTitle && <h1 className="font-bold">{props.c_bannerTitle}</h1>}
    
    </>
  )
}
export default Herobanner;