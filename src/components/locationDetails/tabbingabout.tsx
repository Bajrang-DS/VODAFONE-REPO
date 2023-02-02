import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';

type props = {
    prop: any;

};
const Examples = (data: props) => {

    const [selectedTab, setSelectedTab] = useState('tab-0');

    const [des, setDesc] = useState([])
    const [text, setText] = useState([])


    return (
        <>
            {/* {data.prop.text? */}
            <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>

                <TabList>

                    {data.prop.map((i: any, index: any) => {
                        return (

                            <> 
                            {i.title && i.description?(
                                <>
                            <Tab item={`tab-${index}`}>{i.title}</Tab>
                                <TabPanel item={`tab-${index}`}>
                                    {i.description}
                             </TabPanel>
                             </>
                             ):""}
                            </>
                        )


                    })

                    }


                </TabList>
                {/* {data.prop.description.map((i: any, index: any) => {
                    return (<>
                        <TabPanel item={`tab-${index}`}>
                            {i}
                        </TabPanel>

                    </>)


                })

                } */}


            </Tabs>
            {/* // :""} */}
        </>
    );
};

export default Examples;