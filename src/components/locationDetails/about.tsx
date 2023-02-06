import { Link } from "@yext/pages/components";
import * as React from "react";
// import abbanner from "../../images/ab-banner.jpg"
// import dt12 from "../../images/dtl2.jpg"
import PhotoSlider from "./PhotoSlider"

export default function About(props: any) {
  const {c_aboutSection} = props;
  return (
    <>
    
              <div  className=" py-10">
                
                <div className="container mx-auto ab-secmain flex flex-wrap items-center">
                <div className="w-full md:w-1/2 px-5">                   
                <div className="container">
                  {
                    <img style={{ marginBottom: "1px" }} src={c_aboutSection?.image?.url} />
                  }

                </div>
                  </div>
                  <div className="w-full md:w-1/2 about-sec px-5">
                    <h3 className="font-bold text-2xl ">{c_aboutSection?.title}</h3>
                  <p className="mt-2"> {c_aboutSection?.description}</p>
                    <div className="mt-6"><Link className="bg-[#FF0000] p-4 text-white rounded-lg" href="#">{c_aboutSection?.cta?.label}</Link></div>
                  </div>
                </div>
              </div> 
    </>
  )


}