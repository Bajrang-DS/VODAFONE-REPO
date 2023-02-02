import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import getSymbolFromCurrency from 'currency-symbol-map'
type product = {
  prop: any;
};
var style = {
  width: "310px",
  height: "310px",
};

var desktopSliderType: string = "";
var tabSliderType: string = "";
var mobileSliderType: string = "";

var desktopSliderCenter: string = "";
var tabSliderCenter: string = "";
var mobileSliderCenter: string = "";




const Featurecategory = (feature: product) => {
  let length = feature.prop.length;

  desktopSliderType = length > 4 ? "loop" : "slide";

  tabSliderType = length > 2 ? "loop" : "slide";

  mobileSliderType = length > 1 ? "loop" : "slide";

  desktopSliderCenter = length > 4 ? "" : "center-4";

  tabSliderCenter = length > 2 ? "" : "center-2";

  mobileSliderCenter = length > 1 ? "" : "center-1";
  return (
    <>
      <div
        className={`food-list ${desktopSliderCenter} ${tabSliderCenter} ${mobileSliderCenter}`}
      >
        <div className="bg-light">
          <div className="container mx-auto">

            <Splide
              options={{
                rewind: false,
                type: desktopSliderType,
                perPage: 4,
                perMove: 1,
                arrows: true,
                drag: false,
                pagination: false,
                lazyLoad: "nearby",
                breakpoints: {
                  1279: {
                    perPage: 2,
                    drag: true,
                    pagination: true,
                    type: tabSliderType,
                  },
                  575: {
                    perPage: 1,
                    padding: "45px",
                    type: mobileSliderType,
                  },
                },
              }}
            >
              {feature.prop &&
                feature.prop.map((i: any, index: any) => {

                  return (

                    <SplideSlide key={index}>
                      {i.text ? (
                        <div className="slide-img">
                          {i.photogallery && i.photogallery.map((p: any) => {
                            return (
                              <>
                                <img
                                  src={p.image.url}
                                  //   className="block"
                                  alt={i.title}
                                />
                              </>
                            )
                          })}
                        
                          <div className="absolute w-full bottom-0 p-2 min-h-16 text-white bg-[#bd1508]">
                            <h2 className="font-bold">{i.text}</h2>
                            <p>{getSymbolFromCurrency(i.price.currencyCode)}{i.price.value}</p>
                          </div>
                        </div>

                      ) : <></>}
                    </SplideSlide>

                  );
                })}
            </Splide>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featurecategory;