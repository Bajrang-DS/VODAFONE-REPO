import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@zendeskgarden/react-tabs';

type props = {
    prop: any;

};
const Example = (data: props) => {

    const [selectedTab, setSelectedTab] = useState('tab-0');

    const [des, setDesc] = useState([])
    const [text, setText] = useState([])


    return (
        <>
        {data.prop.text?
        <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
       
            <TabList>
          
                {data.prop.text.map((i: any, index: any) => {
                    return (<> <Tab item={`tab-${index}`}>{i}</Tab></>)


                })

                }


            </TabList>
            {data.prop.description.map((i: any, index: any) => {
                return (<>
                    <TabPanel item={`tab-${index}`}>
                        {i}
                    </TabPanel>

                </>)


            })

            }
       
    
        </Tabs>
        :""}
        </>
    );
};

export default Example;