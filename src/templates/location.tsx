
import LocationInformation from "../components/locationDetails/LocationInformation";
import * as React from "react";
import { useState, useEffect } from 'react';
import bannerImage from "../images/hero-banner.png";
import Banner from "../components/locationDetails/banner";
import { JsonLd } from "react-schemaorg";
import Cta from "../components/commons/cta";
import BreadCrumbs from "../components/layouts/BreadCrumbs";
import { fetch } from "@yext/pages/util";
// import { AnalyticsProvider, Link } from "@yext/pages/components";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";

// import Header from "../components/layouts/header";
import About from "../components/locationDetails/about";
import NearByLocation from "../components/locationDetails/NearByLocation";
// import favicon from "../images/favicon.png"
import favicon from "../images/vodafone-favIcon.ico";
import { nearByLocation } from "../types/nearByLocation";
import Productcategory from "../components/locationDetails/Productcategores";
import Faq from "../components/locationDetails/Faqs";
// import OpenClose from "../components/commons/openClose";
import OpenClose from "../components/commons/openclose";
// import OpenClose from "../components/commons/openClose";
import Storefacility from "../components/locationDetails/Storefacility";
import TrustBoxContainer from "../components/locationDetails/Trust";
// import Aboutbanner from "../components/locationDetails/aboutbanner";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import "../index.css";
import {
  radius,
  api_base_url,
  liveAPIKey,
  // savedFilterId,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  entityTypes,
  limit,
  stagingBaseUrl,
  icon,
} from "../types/constants";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
// import Footer from "../components/layouts/footer";
import Service from "../components/locationDetails/service";
// import Opening from "../components/commons/openClose";
import Example from "../components/locationDetails/Example";
import OpenCloseStatus from "../components/commons/OpenCloseStatus";
import Featurecategory from "../components/locationDetails/Featureproduct";
import Brand from "../components/locationDetails/Brand";
import PhotoSlider from "../components/locationDetails/PhotoSlider";
import PhotoGallery from "../components/locationDetails/PhotoGallery";
// import bannerImage from "../../images/banner.png";
// import bannerImage from "../images/banner.png";
// import tabbingabout from "../components/locationDetails/tabbingabout";
import Examples from "../components/locationDetails/tabbingabout";
import OfferSection from "../components/locationDetails/OfferSection";
import DiscoverSection from "../components/locationDetails/DiscoverSection";
import Locationbanner from "../components/locationDetails/detailpagebanner";
import PageLayout from "../components/layouts/PageLayout";
var currentUrl = "";
// export const config: TemplateConfig = {
//   stream: {
//     $id: "Ryman",

//     fields: [
//       "id",
//       "uid",
//       "meta",
//       "name",
//       "address",
//       "mainPhone",
//       "yextDisplayCoordinate",
//       "neighborhood",
//       "photoGallery",
//       "description",
//       "hours",
//       "c_facilities",
//       "c_ourservice",
//       // "c_booking",
//       // "deliveryHours",
//       "slug",
//       " c_aboutData",
//       // "c_aboutStoreDatas",
//       // "c_Diptyqueervices",
//       // "c_decsec",
//       "geocodedCoordinate",
//       "c_bannerimage",
//       // "c_Diptyque_icons",
//       // "c_Diptyquelink",
//       // "c_footerlinks",
//       // "c_footerlinks2",
//       // "c_footerlinks3",
//       // "c_footercondition",
//       // "c_footerheading",
//       // "c_footerdata",
//       "c_tagLine",
//       "c_ctaButton",
//       // "c_metaTags",
//       // "dm_directoryParents.name",
//       // "dm_directoryParents.slug",
//       // "dm_directoryParents.meta.entityType",
//       // "c_aboutdream",
//       // "c_productcategore",
//       // "c_featuredsproducts",
//       // "c_shopdata",
//       "c_relatedfaq.question",
//       "c_relatedfaq.answer",
//       // "c_relatedfaqs.c_ctabutton",
//       // "c_brand",
//       // "c_twittertags",
//       // "c_ogtags",
//       "c_heading",
//       // "c_ctabutton",
//       "dm_directoryParents.name",
//       "dm_directoryParents.slug",
//       "dm_directoryParents.meta.entityType",
//       "dm_directoryParents.c_addressRegionDisplayName",
//       "additionalHoursText"

//     ],

//     filter: {
//       entityTypes: ["location"]
//       // savedFilterIds: ["1100445776"]
//     },

//     localization: {
//       locales: ["en_GB"],
//       primary: false,
//     },
//   },
// };
export const config: TemplateConfig = {
  stream: {
    $id: "locations",

    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "c_image",
      "c_newsPhoto",
      "description",
      "logo",
      "photoGallery",
    "c_Services",
      "yextDisplayCoordinate",
      "hours",
      "slug",
      "c_discoverSection",
      "c_faqs.question",
      "c_faqs.answer",
      "c_faqs.c_ans2",
      "c_aboutSection",
      // "c_techTeamTitle",
      // "c_ourservice",
      // "c_techTeamDescription",
      // "c_businessPlanAdvice",
      // "c_businessPlanAdviceDescription",
      // "c_tradeIn",
      // "c_homeBroadband",
      // "additionalHoursText",
      // "c_homeBroadbandDescription",
      // "c_specificDay",
      // "c_tradeInDescription",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.meta.entityType",
      // "c_faqs.question",
      // "c_faqs.answer",
      // "c_aboutData",
      // "c_offer",
      // "c_discoverSection",
      // "c_fAQsCta",
      // "geocodedCoordinate"

    ],

    filter: {
      entityTypes: ["location"],
    },

    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

var url = "";

export const getPath: GetPath<TemplateProps> = ({ document }) => {
    var URL: any = ""

//   document?.dm_directoryParents?.map((i: any) => {
//     if (i.meta.entityType.id == 'ce_country') {
//       URL = `${i.slug}`
//     }
//     else if (i.meta.entityType.id == 'ce_region') {
//       URL = `${url}/${i.slug}`
//     }
//     else if (i.meta.entityType.id == "ce_city"){
//       URL = `${url}/${i.slug}/${document.slug.toString()}`
//     }
//   })
//   return URL;
//   // return url = `${url}/${i.slug}/${document.slug.toString()}`
// };

  var url = "";
  var name: any = document.name.toLowerCase();
  var string: any = name.toString();;
  let result: any = string.replaceAll(" ", "-");
  document.dm_directoryParents?.map((result: any, i: number) => {
    if (i > 0) {
      url += result.slug + "/"
    }
  })
  if (!document.slug) {
    url += `${result.slug}`;
  } else {
    url += `${document.slug.toString()}`;
  }
 return url;
};




export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,

}): HeadConfig => {
  var name: any = document.name.toLowerCase();
  var string: any = name.toString();
  let removeSpecialCharacters = string.replace(
    /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
    "");
   let result: any = removeSpecialCharacters.replaceAll(" ", "-");
   let metaDescription = "Find your nearest Vodafone store and which services are available" + document.name;
   let metaTitle = document.name ? document.name : "Vodafone UK | Find a Store ";
   let metaAuthor =  "Vodafone location"
  let ogmetaImage =  "https://cdn.vodafone.co.uk/en/assets/images/large/IMG_10480.jpg"
   let metaURL = stagingBaseUrl 
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          description: "This site was generated by the Yext SSG",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: `${metaAuthor}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href:`${document._site? document._site + `${document.id}-${result}.html`: stagingBaseUrl + `${document.id}-${result}.html`}`
        },
      },
      // // og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${document._site ? document._site + `${document.id}-${result}.html`: stagingBaseUrl + `${document.id}-${result}.html`}`,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:tilte",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${ogmetaImage}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "ogphoto",
          content: icon,
        },
      },
      // /// twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: `${document._site ? document._site + `${document.id}-${result}.html`: stagingBaseUrl + `${document.id}-${result}.html`}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: "https://www.vodafone.co.uk/cs/groups/configfiles/documents/document/favicon.ico",
        },
      },
    ],
  };
};



type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch?radius=1000&location=${data.document.yextDisplayCoordinate.latitude},${data.document.yextDisplayCoordinate.longitude}&api_key=3a58affb71208da4872659791cb78e07&v=20181201&resolvePlaceholders=true&entityTypes=location&limit=4`
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};




//  type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
//  export const transformProps: TransformProps<ExternalApiData> = async (
//    data: any
//  ) => {
//    const url = `${api_base_url}entities/geosearch?radius=${radius}&location=${
//      data.document.yextDisplayCoordinate &&
//      data.document.yextDisplayCoordinate.latitude
//    },${
//      data.document.yextDisplayCoordinate &&
//      data.document.yextDisplayCoordinate.longitude
//    }&api_key=${liveAPIKey}&v=20181201&resolvePlaceholders=true&entityTypes=${entityTypes}&savedFilterId=${savedFilterId}&limit=${limit}&fields=googlePlaceId,slug,address,addressHidden,hours,name,geocodedCoordinate,isoRegionCode,localPhone,mainPhone,timezone,yextDisplayCoordinate,meta,timeZoneUtcOffset,what3WordsAddress,closed,distances`;
//    const externalApiData = (await fetch(url).then((res: any) =>
//      res.json()
//    )) as nearByLocation;
//    return { ...data, externalApiData };
//  };


type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  externalApiData,
  document,
  __meta,
}) => {
  const {
    _site,
    name,
    hours,
    address,
    mainPhone,
    description,
    yextDisplayCoordinate,
    dm_directoryParents,
    c_decsec,
    c_aboutData,
    deliveryHours,
    c_discoverSection,
    // c_dreamaboutdata,
    // c_dreamfindstore,
    // c_dreamteam,
    c_techTeamTitle,
    c_booking,
    photoGallery,
    c_tagLine,
    c_ctaButton,
    c_Diptyqueervices,
    c_redirectToLocator,
    slug,
    c_bannerimage,
    timezone,
    c_fAQsCta,
    c_aboutdream,
    c_productcategore,
    c_featuredsproducts,
    // c_shopdata,
    c_faqs,
    c_specificDay,
    c_brand,
    c_heading,
    c_ctabutton,
    c_ourservice,
    c_facilities,
    c_aboutStoreDatas,
    c_offer,
    // dm_directoryParents.name,
    // dm_directoryParents.slug,
    // dm_directoryParents.meta.entityType,
    // dm_directoryParents.c_addressRegionDisplayName,
    additionalHoursText,
    c_image,
    c_newsPhoto,
    c_Services,
    logo,
    c_aboutSection,
    // dm_directoryParents,


  } = document;
  //console.log(c_specificDay, "c_specificDay");

  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme = [];
  for (var key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: key,
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            let openIntervals = hours[key].openIntervals;
            for (var o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } else {
      }

      hoursSchema.push(openIntervalsSchema);
    }
  }
  document.dm_directoryParents &&
    document.dm_directoryParents?.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseUrl +

              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_region") {
        let url = "";
        document.dm_directoryParents?.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_region" &&
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            console.log(j, "j");
            url = url + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseUrl +
              url + "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      } else if (i.meta.entityType.id == "ce_city") {
        let url = "";
        document.dm_directoryParents?.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            console.log(j, "j");
            url = url + "/" + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseUrl +
              url + "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": stagingBaseUrl + path,
      name: document.name,
    },
  });
  // var buttonLabel = c_booking.button.label ? c_booking.button.label : "Label" ;
  // var buttonLink = c_booking.button.link ? c_booking.button.link : "Link";
  // var ctaLabel   = c_booking.cta.label ? c_booking.cta.label : "CTA Label" ; 
  // var ctaLink = c_booking.cta.link ? c_booking.cta.link : "CTA Link"
  return (
    <>
      <JsonLd<Location>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          name: "Vodafone",
          itemListElement: breadcrumbScheme,
          // logo: document.logo.image.url,
        }}
      />
      
      <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "DepartmentStore",
          name: "Vodafone UK",
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          description: description,
          // image: imageurl,
          telephone: mainPhone,
          // url: `${document._site.c_metaTags.canonicalURL ? document._site.c_metaTags.canonicalURL + `${document.id}-${document.name.replaceAll(" ", "-")}.html`: stagingBaseUrl + `${document.id}-${document.name.replaceAll(" ", "-")}.html`}`
        }}
      />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
       {c_faqs ? (
        <>
          <JsonLd<FAQPage>
            item={{
              "@context": "https://schema.org",
              "@type": "FAQPage",

              mainEntity:
              c_faqs &&
              c_faqs?.map((i: any) => {
                  return {
                    "@type": "Question",
                    name: i.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `<p>${i.c_ans2}</p>`,
                    },
                  };
                }),
            }}
          />
        </>
      ) : (
        <></>
      )}
      <AnalyticsScopeProvider name={""}>
      <Header _site={_site}/>
     
        <AnalyticsScopeProvider name={"header"}>
        </AnalyticsScopeProvider>
        <BreadCrumbs
          name={name}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
          address={{}}
        ></BreadCrumbs>
         {/* <Banner c_image={c_image}/> */}
        <LocationInformation
          prop={hours}
          deliveryHours={deliveryHours}
          coords={yextDisplayCoordinate}
          address={address}
          phone={mainPhone}
          service={c_Diptyqueervices}
          name={name}
          
          c_heading="heading"
          c_ctabutton="button"
          timezone={timezone}
          additionalHoursText={additionalHoursText}
          hours={hours}
        />
        <About  c_aboutSection={c_aboutSection} ></About>
        <OfferSection offer={photoGallery}/>
        <Storefacility c_Services={c_Services}></Storefacility>
        <div className="w-full text-center">
           <DiscoverSection c_discoverSection={c_discoverSection}/>
         
           {c_faqs ? <div className="w-full text-left">
          {/* <h4 className="sec_heading  font-bold text-center">Frequently Asked Questions</h4> */}
          { <Faq prop={c_faqs} c_faqs={document.c_fAQsCta}/> }
        </div> : <></>}
        </div>
          <NearByLocation
            prop={externalApiData}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
            coords={yextDisplayCoordinate}
            slug={slug}
            services={document.c_ourservice}
            c_heading="{c_heading}"

          />
       
          
       <div className=" flex justify-center"><div><Link href="/locator.html" eventName="ViewMoreLocation" className="bg-[#FF0000] p-2 text-white">View More Locations</Link></div></div>

       <Footer _site={_site}/>

      {/* <Footer midfooter={_site.c_midfooter} c_buyOnline={_site.c_buyOnline} buyingonlineCTAs={_site.c_buyingOnlinecta} latestPhone={_site.c_latestPhones} latestPhonesCTAs={_site.c_latestPhonescta}
     helpSupport={_site.c_helpSupport} helpSupportcta={_site.c_helpSupportcta} vodafoneUK={_site.c_vodafoneUK} vodafoneUKCta={_site.c_vodafoneUKCta} c_cPIChanges={_site.c_cPIChanges}
     c_cPIChangesDescription1={_site.c_cPIChangesDescription1} vodafoneDetails={_site.c_vodafoneDetails}
     ></Footer>  */}
      </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default Location;
