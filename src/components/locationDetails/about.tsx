import { Link } from "@yext/pages/components";
import * as React from "react";
// import abbanner from "../../images/ab-banner.jpg"
// import dt12 from "../../images/dtl2.jpg"
import PhotoSlider from "./PhotoSlider"

export default function About(props: any) {
  const { c_aboutData} = props;
  return (
    <>
    
              <div  className=" py-10">
                
                <div className="container mx-auto ab-secmain flex flex-wrap items-center">
                {/* {c_aboutData.photo.url && <div className="w-full md:w-1/2 px-5">                   
                       <img src={c_aboutData.photo.url} alt="images"/>    */}
                  </div>}
                  <div className="w-full md:w-1/2 about-sec px-5">
                    {c_aboutData.title && <h3 className="font-bold text-2xl ">{c_aboutData.title}</h3>}
                    {c_aboutData.description && <p className="mt-2"> {c_aboutData.description}</p>}
                    {c_aboutData.cTA.label &&  <div className="mt-6"><Link className="bg-[#FF0000] p-4 text-white rounded-lg" href={c_aboutData.cTA.link} eventName={c_aboutData.cTA.label}>{c_aboutData.cTA.label}</Link></div>}
                  </div>
                </div>
              </div> 
    </>
  )


}