import * as React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Banner from "../components/banner";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
// import "../main.css";
import {

  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { stagingBaseUrl } from "../constants";
import { AnalyticsProvider } from "@yext/search-ui-react";
import Herobanner from "../components/commons/Herobanner";
// import Logo from "../images/logo.svg";
// import bannerImage from "../images/app-bg.png";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "root",
    filter: {
      entityTypes: ["ce_root"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "description",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildrenCount"
      // "c_globalData.c_headerLinks1",
      // "c_globalData.c_footerLinks",
      // "c_globalData.facebookPageUrl",
      // "c_globalData.twitterHandle",
      // "c_globalData.instagramHandle",
      // "c_globalData.address",
      // "c_globalData.c_phoneNumber",
      // "c_globalData.c_companyrn",
      // "c_globalData.c_tikTok",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = document.slug.toString() + ".html";
  return document.slug.toString() + ".html";
};

// export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
//   relativePrefixToRoot,
//   path,
//   document,
// }): HeadConfig => {
//   return {
//     title: document.name,
//     charset: "UTF-8",
//     viewport: "width=device-width, initial-scale=1",
//   };
// };

const Root: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { description, dm_directoryParents, dm_directoryChildren, _site } = document;

  const { name, slug, c_globalData } = document;

  return (
    <>
      {/* <Header
        data={c_globalData[0].c_headerLinks1}
        facebookPageUrl={c_globalData[0].facebookPageUrl}
        instagramHandle={c_globalData[0].instagramHandle}
        twitterHandle={c_globalData[0].twitterHandle}
        c_tikTok={c_globalData[0].c_tikTok}
      /> */}
      {/* <Banner
        Name={slug ? slug : ""}
        TagLine={""}
        BackgroundImage={bannerImage}
        CtaButton={""}
      /> */}
   

        <div className="directory-root py-5 lg:py-[60px]">
          <div className="container">
            <div className="flex flex-wrap -mx-4">
              {dm_directoryChildren.map((child: any) => {
                return (
                  <>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 px-4">
                      <a
                        href={slug + "/" + child.slug + ".html"}
                        key={child.slug}
                        className="hover:text-red"
                      >
                        {child.name} {child.dm_directoryChildrenCount}
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
   
    

     

    </>

  );
};

export default Root;
