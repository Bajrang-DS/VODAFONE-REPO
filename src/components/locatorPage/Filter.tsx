import * as React from "react";
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { FilterSearch, VerticalResults, ResultsCount, Pagination, LocationBias, NumericalFacets, NumericalFacetsProps, StandardFacets, StandardFacetsProps } from "@yext/search-ui-react";



const FilterAwesome = (props: any) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpen(true);
  // }

  // const closeModal = () => {
  //   setIsOpen(false);
  // }

  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //   },
  // };

  let subtitle: any;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  function openModal() {
    document.body.classList.add("overflow-hidden")
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden")
    setIsOpen(false);
  }



  return (
    // <div className="filterButton">
    //      <button className="current-location hide-mob" onClick={openModal}>
    //           <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17.005" viewBox="0 0 17 17.005">
    //             <path id="filter" d="M19.056,4.889h-1.1a2.834,2.834,0,0,0-5.346,0H3.944a.944.944,0,0,0,0,1.889h8.661a2.834,2.834,0,0,0,5.346,0h1.1a.944.944,0,0,0,0-1.889ZM15.278,6.778a.944.944,0,1,0-.944-.944A.944.944,0,0,0,15.278,6.778ZM3,11.5a.944.944,0,0,1,.944-.944H5.049a2.834,2.834,0,0,1,5.346,0h8.661a.944.944,0,1,1,0,1.889H10.4a2.834,2.834,0,0,1-5.346,0H3.944A.944.944,0,0,1,3,11.5Zm4.722.944a.944.944,0,1,0-.944-.944A.944.944,0,0,0,7.722,12.444ZM3.944,16.222a.944.944,0,0,0,0,1.889h8.661a2.834,2.834,0,0,0,5.346,0h1.1a.944.944,0,0,0,0-1.889h-1.1a2.834,2.834,0,0,0-5.346,0Zm12.278.944a.944.944,0,1,1-.944-.944A.944.944,0,0,1,16.222,17.167Z" transform="translate(-3 -2.998)" fill="#f089b1" fillRule="evenodd" />
    //           </svg>
    //           Filters</button>
    // <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} >
    //     <StandardFacets />
    //   </Modal>
    <div className="filterButton">
      <button className="current-location hide-mob" onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17.005" viewBox="0 0 17 17.005">
          <path id="filter" d="M19.056,4.889h-1.1a2.834,2.834,0,0,0-5.346,0H3.944a.944.944,0,0,0,0,1.889h8.661a2.834,2.834,0,0,0,5.346,0h1.1a.944.944,0,0,0,0-1.889ZM15.278,6.778a.944.944,0,1,0-.944-.944A.944.944,0,0,0,15.278,6.778ZM3,11.5a.944.944,0,0,1,.944-.944H5.049a2.834,2.834,0,0,1,5.346,0h8.661a.944.944,0,1,1,0,1.889H10.4a2.834,2.834,0,0,1-5.346,0H3.944A.944.944,0,0,1,3,11.5Zm4.722.944a.944.944,0,1,0-.944-.944A.944.944,0,0,0,7.722,12.444ZM3.944,16.222a.944.944,0,0,0,0,1.889h8.661a2.834,2.834,0,0,0,5.346,0h1.1a.944.944,0,0,0,0-1.889h-1.1a2.834,2.834,0,0,0-5.346,0Zm12.278.944a.944.944,0,1,1-.944-.944A.944.944,0,0,1,16.222,17.167Z" transform="translate(-3 -2.998)" fill="#f089b1" fillRule="evenodd" />
        </svg>
        Filters</button>
      <Modal isOpen={modalIsOpen} style={customStyles} >

        <h3 className="popup-title">Dream</h3>
        <a onClick={closeModal} type="button" id="closeButton" data-modal-toggle="allergens-pdf"
          className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:24px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20.953" height="20.953" viewBox="0 0 20.953 20.953">
            <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close"
              d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
              transform="translate(-7.523 -7.523)" fill="#B1B1B1" />
          </svg>
        </a>


        <StandardFacets  searchOnChange={true}/>  <div className="popbtn-main"> <button onClick={closeModal} className="popbtn !block">Apply</button> </div>
    
      </Modal>

    </div>
  );
};

export default FilterAwesome;