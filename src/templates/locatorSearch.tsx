import * as React from "react";
import "../index.css";
import { GetPath, Template, TemplateProps, TemplateRenderProps, TemplateConfig, GetHeadConfig,
  HeadConfig } from "@yext/pages";
import { SearchHeadlessProvider, useSearchActions } from "@yext/search-headless-react";
import PageLayout from "../components/layouts/PageLayout";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {  AnswerExperienceConfig, stagingBaseUrl  } from "../config/globalConfig";
// import favicon from "../images/favicon.png";
import favicon from "../images/vodafone-favIcon.ico";
import metaIcon from "../images/map-center9.png";

// import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie } from "../types/constants";
// import { AnalyticsProvider } from "@yext/search-ui-react";
import { AnalyticsScopeProvider, AnalyticsProvider } from "@yext/pages/components";
import { JsonLd } from "react-schemaorg";
import Herobanner from "../components/commons/Herobanner";


// export const config: TemplateConfig = {
//   stream: {
//     $id: "Locator",
//     // Specifies the exact data that each generated document will contain. This data is passed in
//     // directly as props to the default exported function.
//     fields: [
//       "name",
     
//     ],
//     // Defines the scope of entities that qualify for this stream.
//     filter: {
//       entityIds: ["globaldata"]
//     },
//     // The entity language profiles that documents will be generated for.
//     localization: {
//       locales: ["en"],
//       primary: false,
//     },
//   },
// };



export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}): HeadConfig => {
   let metaDescription =  "Find your nearest Vodafone store and which services are available." + document.name;
   let metaTitle =  "Vodafone UK | Find a Store " + document.name; 
  let metaAuthor =  "Vodafone"
   let ogmetaImage =  "https://cdn.vodafone.co.uk/en/assets/images/large/IMG_10480.jpg"
   let metaURL =  stagingBaseUrl
  return {
    charset: "UTF-8",
    // title: `${metaTitle}`,
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
          name: "description",
          content: `${metaDescription}`,
        },
      },

      // {
      //   type: "meta",
      //   attributes: {
      //     name: "title",
      //     content: `${metaTitle}`,
      //   },
      // },
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
          href: `${metaURL}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${metaURL}`,
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
          property: "og:title",
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
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: metaURL,
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
          content: `https://www.vodafone.co.uk/cs/groups/configfiles/documents/document/favicon.ico`,
        },
      },
    ],
  };
};
const locatorSearch: Template<TemplateRenderProps> = ({relativePrefixToRoot, path, document}) => {
const { _site, __meta } = document;
const providerOptions: google.maps.MapOptions = {
  disableDefaultUI: true
}
let templateData= { document: document, __meta: __meta };

return (
    <>
     {/* <Header></Header> */}
    {/* <Header header={_site.c_header} /> */}
    <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name:  "Vodafone UK | Find a Store " + document.name,
          url:  stagingBaseUrl,
          logo: metaIcon,
        }}
      />
     <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        <AnalyticsScopeProvider name={""}>
          
      <PageLayout>
      <Header _site={_site}/>
      <div className="header-title ">
          <Herobanner c_bannerTitle={_site.c_bannerTitle}></Herobanner>
        </div>
        <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={AnswerExperienceConfig.locale}
            apiKey={AnswerExperienceConfig.apiKey}               
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion={AnswerExperienceConfig.experienceVersion}
            sessionTrackingEnabled={AnswerExperienceConfig.sessionTrackingEnabled}  
            endpoints={AnswerExperienceConfig.endpoints}         
        >
           <SearchLayout/>
        </SearchHeadlessProvider>
        <Footer _site={_site}/>
     {/* <Footer midfooter={_site.c_midfooter} buyingonline={_site.c_buyingOnline} buyingonlineCTAs={_site.c_buyingOnlinecta} latestPhone={_site.c_latestPhones} latestPhonesCTAs={_site.c_latestPhonescta}
     helpSupport={_site.c_helpSupport} helpSupportcta={_site.c_helpSupportcta} vodafoneUK={_site.c_vodafoneUK} vodafoneUKCta={_site.c_vodafoneUKCta} c_cPIChanges={_site.c_cPIChanges}
     c_cPIChangesDescription1={_site.c_cPIChangesDescription1} vodafoneDetails={_site.c_vodafoneDetails}
     ></Footer> */}
     
      </PageLayout>
     </AnalyticsScopeProvider>
    </AnalyticsProvider>
      {/* <Footer c_footerServices={_site.c_footerServices} c_footerOrders={_site.c_footerOrders} c_footerNewatdiptyque={_site.c_footerNewatdiptyque} c_footerMostpopular={_site.c_footerMostpopular} c_service={_site.c_service} /> */}
    </>
  );
};

export default locatorSearch;