
// import * as React from "react";
// import bannerImage from "../../images/hero-banner.png";
// import { Link } from "@yext/pages/components";
// export type Address = {
//   line1: string;
//   city: string;
//   region: string;
//   postalCode: string;
//   countryCode: string;
// };
// type props = {
//   Name: any;
//   TagLine: any;
//   BackgroundImage: any;
//   CtaButton: any;
//   template: any;
// };
// type Banner = {
//   name?: string;
//   address?: Address;
//   openTime?: string;
//   children?: React.ReactNode;
// };
// /**
// * Component for Banner 
// * @param Data 
// * @returns HTML element
// */
// const Banner = (Data: props) => {
//   const conversionDetails_primaryCTA = {
//     cid: "dc6937a6-345d-4c0f-b63f-79be3c29d7bc",
//     cv: "3",
//   };
//   return (
//     <>
//       <div className="hero">
//         <img
//           className="hero-img"
//           src={Data.template == "location" ? Data.BackgroundImage : bannerImage} alt="banner" />
//         <div className="container mx-auto text-center">
//           <h1>{Data.Name ? Data.Name : ""}</h1>
//           <h2>{Data.TagLine ? Data.TagLine : ""}</h2>
//           {Data.CtaButton ? (
//             <>
//               {Data.CtaButton.label && Data.CtaButton.link ? (
//                 <div className="cta_btn">
//                   <Link
//                     rel="noopener noreferrer"
//                     data-ya-track="cta_button"
//                     eventName={Data.CtaButton.label}
//                     conversionDetails={conversionDetails_primaryCTA}
//                     href={
//                       Data.CtaButton.linkType == "PHONE" ? `tel:${Data.CtaButton.link}` : (Data.CtaButton.linkType == "EMAIL" ? `mailto:${Data.CtaButton.link}` : Data.CtaButton.link) 
//                     }
//                     className="button"
//                     target={
//                       Data.CtaButton.linkType == "PHONE" ? "_self" : (
//                         Data.CtaButton.linkType == "URL" ? "_self" : (Data.CtaButton.linkType == "OTHER" ? "_blank" : "_self")
//                         ) 
//                     }
//                   >
//                     {Data.CtaButton ? Data.CtaButton.label : ""}
//                   </Link>
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;

