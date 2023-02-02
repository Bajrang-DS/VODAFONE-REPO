// import React, { useState } from "react";
import * as React from "react";
import { useState } from "react";
// import "./Modal.css";
type props = {
    prop: any;
    ourservice:any;
  };
 const Modal =(service:any)=> {
     const {ourservice} = service
  const [modal, setModal] = useState(false);

  const toggleModal = (service:any) => {
    setModal(!modal);
  };
let dcot = document.body
  if(modal) {
    dcot.classList.add('active-modal')
  } else {
    dcot.classList.remove('active-modal')
  }
  return (
    <>
      <div className="p-2">
        {/* <></>AVAILABLE SERVICES</h3> */}
        <p className="m-2 text-sm ">AVAILABLE SERVICES</p>
        {ourservice?.map((i:any)=>(
            // <li><a href="">{}</a></li>
            <button onClick={toggleModal} className="m-2  serive-text hover:list-disc text-red-700">{i.title}</button>
        ))}
   
      </div>
      {modal && (
        <div className="modal z-[9999] mt-28">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="text-red-700">Services available in Lowestoft</h2>
            {/* <p className="text-black">
             hellooo
            </p>  */}
              <div className="grid grid-cols-2 p-2 px-0.5">
            {ourservice?.map((i:any, index:any)=>(
           
              <div key={index} className="p-2"><br />
            <img src={i.photo.url} alt="service"/>
                <h2>{i.title}</h2> 
                {i.description}</div>
           
             ))}
           </div>
            
            <button className="close-modal text-black" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      
    </>
  );
}
export default Modal