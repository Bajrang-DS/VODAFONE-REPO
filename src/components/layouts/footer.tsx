import * as React from "react";
// import storeicn from "../../images/store-finder.svg";
// import facebook from "../../images/facebook.svg";
// import instagram from "../../images/instagram.svg";
// import twitter from "../../images/twitter.svg";
// import youtube from "../../images/youtube.svg";
// import printest from "../../images/printest.svg";
import { Link } from "@yext/pages/components";

const Footer = (props: any) => {
  const { c_buyOnline, c_latest, c_helpsupport, c_vodaphoneuk, c_underlink, c_consumerDes, c_cpichange, c_vodaphonedetaols } = props;


  return (
    <>

      <footer className="footer">
        <div className="container-custom">
          <div className="footer-nav">
            <div className="footer-links">
              <h4>
                Buying online
              </h4>
              <ul>

                {props._site?.c_buyOnline?.map((item: any, index: number) => (

                  <li key={index}>
                    <Link eventName={item.label} href={item.link}>
                     <a href="#">{item.label}</a> 
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-links">
              <h4> Latest phones </h4>
              <ul>
                {props._site?.c_latest?.map((item: any, index: number) => (

                  <li key={index}>
                    <Link eventName={item.label} href={item.link}>
                    <a href="#">{item.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-links">
              <h4> Help & Support </h4>
              <ul>
                {props._site?.c_helpsupport?.map((item: any, index: number) => (

                  <li key={index}>
                    <Link eventName={item.label} href={item.link}>
                    <a href="#">{item.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-links">
              <h4>
                Vodafone UK

              </h4>
              <ul>
            
                {props._site?.c_vodaphoneuk?.map((item: any, index: number) => (

                  <li key={index}>
                   <a > <Link eventName={item.label} href={item.link}>
                   <a href="#">{item.label}</a>
                    </Link></a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="find-location-sec">
              <div className="flex justify-between mt-10 w-full">
                {props._site?.c_underlink?.map((item: any, index: number) => (

                  <li key={index}>
                    <Link eventName={item.label} href={item.link}>
                    <a href="#">{item.label}</a>
                    </Link>
                  </li>
                ))}

              </div>
            </div>
          </div>
        </div>
        <div className="container-custom mx-auto">
          <div key={props.c_cpichange} className="footer_links">
            <h2>
              {props._site.c_cpichange}
            </h2>
          </div> 
           <p key={props.c_consumerDes}>
            {props._site.c_consumerDes}
          </p>  <br />
           <p key={props.c_vodaphonedetaols}>
            {props._site.c_vodaphonedetaols}
          </p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
