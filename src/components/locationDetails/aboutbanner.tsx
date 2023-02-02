import * as React from "react";
import PhotoSlider from "./PhotoSlider"

function Aboutbanner(props: any) {
    const { c_shopdata } = props;
    return (
        <>

            <div className="bg-[#3a356d] text-left p-12 ">
                {c_shopdata.textlistdata.map((i: any) => {

                 return (
                        <>
                      <p className="pb-2 text-white text-xl text-semibold">{i}</p>
                      </>
                       ) })}
                      {c_shopdata.cta ? (
                      <>

                         {c_shopdata.cta.label && c_shopdata.cta.link ? (
                            <>

                                <a href={
                                    c_shopdata.cta.linkType == "URL" ? `${c_shopdata.cta.link}` : c_shopdata.cta.link} className="border-2 text-white bg-[#cbb081] border-[#cbb081] p-2"
                                    target={c_shopdata.cta.linkType == "URL" ? "_self" : c_shopdata.cta.link == "#" ? "_self" : "_blank"}>
                                    {c_shopdata.cta ? c_shopdata.cta.label : ""}
                                </a>
                            </>
                        ) : (
                            <></>

                        )}
                    </>
                ) : (
                    <></>
                )}



            </div>




        </>
    )


}
export default Aboutbanner



{/* <div className="bg-[#3a356d] text-left p-12 ">
<p className="pb-2 text-white text-xl text-semibold">{c_shopdata.textlistdata[0]}</p>

<h4 className="pb-4 text-[#cbb081] text-3xl text-semibold">{c_shopdata.textlistdata[1]}</h4>
<p className="pb-4 text-white text-xl text-semibold ">{c_shopdata.textlistdata[2]}</p>

{/* {c_shopdata.cta ? (
  <>
  {
    c_shopdata.cta.label && c_shopdata.cta.link ? (
      <>

        <a href={
          c_shopdata.cta.linkType == "URL" ? `tel:${c_shopdata.cta.link}` : c_shopdata.cta.link} className="pb-4 text-right text-white text-2xl text-semibold popbtn"
          target={c_shopdata.cta.linkType == "URL" ? "_self" : c_shopdata.cta.link == "#" ? "_self" : "_blank"}>
          {c_shopdata.cta.label ? c_shopdata.cta.label : ""}
        </a>


      </>
    ) : (
      <></>

    )
  }
  </>
  ):<></>} */}
// {
//     c_shopdata.cta ? (
//         <>
//             {c_shopdata.cta.label && c_shopdata.cta.link ? (
//                 <>

//                     <a href={
//                         c_shopdata.cta.linkType == "URL" ? `${c_shopdata.cta.link}` : c_shopdata.cta.link} className="border-2 text-white bg-[#cbb081] border-[#cbb081] p-2"
//                         target={c_shopdata.cta.linkType == "URL" ? "_self" : c_shopdata.cta.link == "#" ? "_self" : "_blank"}>
//                         {c_shopdata.cta ? c_shopdata.cta.label : ""}
//                     </a>
//                 </>
//             ) : (
//                 <></>

//             )}
//         </>
//     ) : (
//         <></>
//     )
// }



// </div > * /}