import { Link } from "@yext/pages/components";
import * as React from "react";
import { useEffect, useState } from "react";
function Locationbanner(props: any) {
  return (
    <>
      {props.c_banners ? (
        <div className="hero">
          <img src={props.c_banners.url} alt="heroBanner" className="heroBanner" />
          <div className="hero-content">
            <h1>{props.name}</h1>
            <button className="button px-2 text-white bg-[#54962f] hover:bg-[#54962f] font-bold py-2 px-4">
              <Link href="#" eventName={`banner`}>
                {props.c_bannerCtas.label}
              </Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="hero">
          <img
            src="https://www.connectedkerb.com/hubfs/Connected%20Kerb%20Lambeth0879%201-min.jpg"
            alt="hero"
            className="heroBanner"
          />

          <div className="hero-content">
            <button className="button px-2 text-white bg-[#54962f] hover:bg-[#54962f] font-bold py-2 px-4">
              <Link
                href="#"
                //  href={props.c_bannerCtas.link}
                eventName={`bannerCta`}
              >
                {/* {props.c_bannerCtas.label} */}
                dfjgjfdsg
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Locationbanner;