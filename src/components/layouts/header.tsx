import * as React from "react";
// import logo from "../../images/logo.svg";
import { Link } from "@yext/pages/components";
type props = {
  prop: any;
};
const Header = (HeaderItem:any) => {
  const { logo, c_headerlink } = HeaderItem;
  
  
  return (
    <>
  <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
  <Link href="#" eventName="logo" className="flex items-center">
   <img style={{height:"45px",width:"45px"}} src= {HeaderItem?._site?.logo?.image?.url} alt="logo" />
  {/* <svg className="h-[35px]" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46" data-di-res-id="21a83ac-db72aca8" data-di-rand="1669619186901"><title>Vodafone logo</title><g data-name="<Group>"><circle data-name="<Path>" cx="141.73" cy="141.73" r="141.73" fill="#e60000"></circle><path data-name="<Path>" d="M142.83 220.77c-38.94.13-79.46-33.11-79.63-86.48-.09-35.29 18.95-69.26 43.29-89.46 23.74-19.66 56.26-32.27 85.76-32.37 3.8 0 7.77.3 10.2 1.13-25.79 5.35-46.32 29.35-46.23 56.58a14.78 14.78 0 0 0 .17 2.31c43.16 10.51 62.75 36.55 62.87 72.58s-28.32 75.55-76.43 75.71z" fill="#fff"></path></g></svg> */}
  </Link>
  <div className="flex md:order-2">
      {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
      {/* <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button> */}
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {HeaderItem._site?.c_headerlink?.map((e:any, index:number)=>(
        <li key={index}>
          {e.label &&  <Link href="#"
        eventName={e.label} className="font-bold block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          {e.label}
        </Link>}
      </li>
      ))}
    </ul>
  </div>
  </div>
</nav>

    </>
  );
};

export default Header;

