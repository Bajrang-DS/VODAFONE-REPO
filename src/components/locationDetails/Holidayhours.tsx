import * as React from "react";
/**
 * Create HolidayHour for holiday feild
 * @param props
 * @returns html for holiday hours feild
 */

const Holidayhour = (props: any) => {
  // console.log(props.c_specificDay, "c_specificDay");
  return (
    <>
      {props.hours.map((res: any, index: Number) => {
        const weeks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
    
        const d = new Date(res.date);
        let day = d.getDay();
        
       var date:any=d.getDate()
       var month:any=d.getMonth()+1
       var year:any =d.getFullYear()
        if (date < 10) {
          date = `0${date}`;
      }
      
      if (month < 10) {
          month = `0${month}`;
      }
    

      
        return (
          <>
          {console.log(props.c_specificDay.holidayDate, year,month,date)
           
          }
            <div className="pop-up-holyhrs">
             {/* <h1> </h1> */}
              <div>{`${date}/${month}/${year}`}</div>
          {/* {console.log(props.c_specificDay.holidayDate, year,month,date) */}
          {props.c_specificDay.holidayDate === year+"-"+month+"-"+date? <div>{props.c_specificDay.holidayName}</div>:""}
              
              {res.openIntervals?.map((openinterval: any, index: Number) => {
                return (
                  <>
                    <div>
                      
                      <span className="op-time">{openinterval.start}</span>{" "}
                      <span className="spac-bx"> - </span>{" "}
                      <span className="cl-time">{openinterval.end}</span>
                    </div>
                  </>
                );
              })}
              <div>Closed</div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default Holidayhour;
function moment() {
  throw new Error("Function not implemented.");
}

