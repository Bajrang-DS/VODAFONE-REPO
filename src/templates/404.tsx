// src/template/404.tsx
import * as React from "react";
import Header from "../../src/components/layouts/footer";
import Footer from "../../src/components/layouts/header";
import favicon from "../images/vodafone-favIcon.ico";
import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
} from "@yext/pages";

export const config: TemplateConfig = {
  stream: {
    $id: "not-found-page",
    fields: [],
    localization: {
      locales: ["en"],
      primary: false,
    },
    filter: {
      entityIds: ["locator-page"],
    },
  },
};

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  return {
    title: "Page Not Found",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
    ],
  };
};
// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { _site } = document;

  return (
    <>
     
      <div className="container">
        <div className="four-sec">
          <h1 style={{ textAlign: "center" }}>
            {" "}
            <b>404 - Page Not Found</b>{" "}
          </h1>

          <p>
            Sorry, the page you requested could not be found or is no longer available.
          </p>
          <a className="btn-no" href="/"> Click here to Return to Homepage</a>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default FourOhFour;
