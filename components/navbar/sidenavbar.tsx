"use client";
import classNames from "classnames";
import React, { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "../ui/button";
import SideNavbarTabs from "./sidenavbartabs";

const SideNavbar = () => {
  const [isCollapsible, setIsCollapsible] = useState(false);
  const wrapperClass = classNames("h-full border-r border-2 px-4 py-2", {
    ["w-80"]: !isCollapsible,
    "w-[70px]": isCollapsible,
  });

  const handleClick = () => {
    setIsCollapsible(!isCollapsible);
  };

  return (
    <div 
    className={wrapperClass}
    style={{ transition: "width 300ms" }}>

      <div className={`flex w-full flex-row justify-end items-center py-2`}>
        <Button
          className={`bg-blue-200 text-gray-900 hover:bg-blue-200`}
          onClick={handleClick}
        >
          {isCollapsible ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </Button>
      </div>

      <div>
        <SideNavbarTabs isCollapsible={isCollapsible} />
      </div>
    </div>
  );
};

export default SideNavbar;
