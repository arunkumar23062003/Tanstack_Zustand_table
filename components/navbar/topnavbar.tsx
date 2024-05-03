"use client";
import React, { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { Button } from "../ui/button";

const Topnavbar = () => {
  const [openFullScreen, setOpenFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!openFullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setOpenFullScreen(!openFullScreen);
  };
  return (
    <div className=" w-full h-[5%] flex justify-end items-center px-4">
      <Button
        className="text-2xl bg-white text-black hover:bg-gray-100"
        onClick={handleFullScreen}
      >
        {!openFullScreen ? <MdFullscreen /> : <MdFullscreenExit />}
      </Button>
    </div>
  );
};

export default Topnavbar;
