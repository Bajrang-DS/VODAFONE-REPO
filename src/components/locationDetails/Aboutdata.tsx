import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
type about = {
  prop: any;
};
var style = {
  width: "310px",
  height: "310px",
};
const Aboutsection = (aboutdata: about) => {
  return (
    <>
      <div className="food-list bg-light">
        <div className="container mx-auto">
          {/* <div className="w-full text-center">
            <h3 className="sec_heading font-bold">Product Category</h3>
          </div> */}

          <Splide
            options={{
              rewind: false,

              type: "loop",

              perPage: 3,
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
                  type: "loop",
                },
                575: {
                  perPage: 1,
                  padding: "45px",
                },
              },
            }}
          >
            {aboutdata.prop &&
              aboutdata.prop.map((i: any, index:any) => {
            
                return (
                    <SplideSlide key={index}>
                    <div className="slide-img">
                        
                    {i.images.map((p:any)=>{
                        return(
                            <>
                              <img
                            src={p.url}
                            //   className="block"
                            //   alt={i.description}  
                            alt="slide"                     
                            />
                            </>
                        )
                        })} 
                  
                      <h2 className="font-bold">{i.heading}</h2>
                      <h4>{i.descriprtion ? i.descriprtion: ""}</h4>
               
                    </div>
                    
                   </SplideSlide>
                );
              })}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default Aboutsection;