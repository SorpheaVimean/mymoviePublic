// import React from 'react'

import { Outlet } from "react-router-dom";
import HeaderPage from "../pages/header/HeaderPage";
import FooterPage from "../pages/footer/FooterPage";
import { useEffect, useState } from "react";

const HomeLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="font-myFont w-full">
        <div className=" ">
         
          <div className="">
            <Outlet />
          </div>
          <div
            className={`fixed z-10 top-0 w-full py-3 ${
              isScrolled ? 'bg-black bg-opacity-75 duration-300' : '' // Apply bg-black class if scrolled
            }`}
          >
            <HeaderPage />
          </div>
        </div>
        <FooterPage />
      </div>
    </>
  );
};

export default HomeLayout;
