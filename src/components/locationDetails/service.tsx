import * as React from "react";
import { useState, useEffect } from 'react';
import { jsonLdScriptProps } from "react-schemaorg";
//  import sleep from "../images/sleep.svg";
 import sleep from "../../images/sleep.svg";
import disable from "../../images/disable.svg";
import parking from "../../images/parking-sign.svg";

type services = {
  service: any; 
};

var array: any = []


const Service = (props: services) => {
  const [data, setData] = React.useState([]);

  useEffect(() => {

    for (let i = 0; i < props.service.length; i++) {
       
       let icon = '';
       if(props.service[i]  == 'FEATHER_BLACK'){
        icon = disable;
       }else if(props.service[i]  == 'CLEARANCE_RANGE'){
        icon = sleep;
       }else if(props.service[i]  == 'SHORTLISTS_IN_STORE'){
        icon = parking;
       }else if(props.service[i]  == 'DISABLED_ACCESS'){
        icon = disable;
       }else if(props.service[i]  == 'KIDS_RANGE_IN_STORE'){
        icon = disable;
       }else if(props.service[i]  == 'PARKING'){
        icon = parking;
       }else if(props.service[i]  == 'SLEEPMATCH'){
        icon = sleep;
       }
       
       let  item = {'name':props.service[i].replaceAll('_', ' ').toLowerCase(),'icon':icon}; 

      array.push(item);
    }

    setData(array);
    array=[];

  },[])


  return (
    <>
      <div className="bg-gray-100 w-full mb-2 pr-8 pl-8">
       

        <div className=" services-list  ">

          {data.map((i: any) => {
            return (
              <>
                <div className=" slebx">
                  <img  src={i.icon} alt="slebx" />
                  <span>{i.name}</span> 
                </div>

              </>
            )

          })

          }
      </div>
        </div>
      
     
    </>
  );
};

export default Service;
