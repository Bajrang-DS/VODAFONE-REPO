import * as React from "react";
/**
 * Component for About section 
 * @param props 
 * @returns HTML element
 */
var array: any = ['Buy Paper', 'Office Desks', 'Office Chairs', 'Office Cleaning', 'Food & Drink', 'Buy Printers']

type services = {
    c_Services: any;
};

export default function Storefacility(props: services) {
    const { c_Services } = props;
    return (
        <>
            <div className="store-faci text-white bg-[#FF0000] p-6">
                <h2>Services</h2>
                <div className="boxes-row">
                    {c_Services.map((e: any, index: any) => (
                        <>

                            <div key={index} className="boxes-fac">
                                <div className="img-item">
                                    {e.image.url && <img src={e.image.url ? e.image.url : ""} alt="serive"></img>}
                                </div>
                                <h3>{e.title ? e.title : ""}</h3>
                            </div>

                        </>
                    ))}
                </div>
            </div>
        </>

    )


}