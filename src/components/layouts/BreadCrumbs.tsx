import { Link } from "@yext/pages/components";
import * as React from "react";
// import { livSiteUrl, locator } from "../constants";
type data = {
  name: any;
  parents: any;
  baseUrl: any;
  address: any;
};

const BreadCrumbs = (props: data) => {
const [list, setList] = React.useState(null);
 var breadcrumbs;
  var data: any = [];
  React.useEffect(() => {
    setURL(props.parents, props.baseUrl);
  }, [setList]);

  const setURL = (parents: any, baseUrl: any) => {
    if (parents) {
      for (let i = 0; i < parents.length; i++) {

       
       if (parents[i].meta.entityType.id == "Vodafone_country") {
          // parents[i].name = regionNames.of(parents[i].name);
 
          parents[i].slug = parents[i].slug;          
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count:parents[i].dm_directoryChildrenCount
          });

        } 
        else if (parents[i].meta.entityType.id == "Vodafone_region") {
          data.push({ name: parents[i].name, slug:`${parents[i-1].slug}/${parents[i].slug}`,
          count:parents[i].dm_directoryChildrenCount });
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i-1].slug}/${parents[i].slug}`;
        } else if (parents[i].meta.entityType.id == "Vodafone_city") {
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i - 1].slug}/${parents[i].slug}`;

          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
            count:parents[i].dm_directoryChildrenCount
          });
        }
      }
      breadcrumbs = data.map((crumb: any) => (
        <li key={crumb.slug}>
        {(crumb.count==1)?<Link eventName={crumb.name} href="javascript:void(0)" className="cursor-not-allowed"> {crumb.name}</Link>
        :<Link eventName={crumb.name} href={baseUrl + crumb.slug + ".html"}> {crumb.name}</Link>}
        
      </li> 
      )    
      );
      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };
  return (
    <div className="breadcrumb">
      <div className="container mx-auto">
        <ul className="flex">
          <li>
            <Link className="home" href="/" eventName={"Home"}>
            {/* <div dangerouslySetInnerHTML={{__html: breadcrumbs}}/> */}
            <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.002" viewBox="0 0 20 20.002">
            <path d="M877,4760h5a1,1,0,0,0,1-1v-8.59l.293.3a1,1,0,1,0,1.414-1.42l-9-9a1,1,0,0,0-1.414,0l-9,9a1,1,0,0,0,1.414,1.42l.293-.3V4759a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1v-5h2v5A1,1,0,0,0,877,            4760Zm4-2h-3v-5a1,1,0,0,0-1-1h-4a1,1,0,0,0-1,1v5h-3v-9.59l6-6,6,6Z" transform="translate(-865 -4739.998)" fill="#d00" fillRule="evenodd"/>
            </svg></div>
            </Link>
          </li>
          {/* <li>
            <a href="https://main-sushi--issue--quotation-sbx-pgsdemo-com.sbx.preview.pagescdn.com/">Store Locator</a>
          </li> */}
          {list ? (
            list
          ) : (
            <>
              {props.address && props.address.city ? (
                <li className="inline-block">
                  {" "}
                  <Link eventName={props.address.city} href={props.baseUrl + props.address.city }>
                    {props.address.city ? props.address.city : ""}
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </>
          )}
         
          <li>{props && props.name}</li>

        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbs;
