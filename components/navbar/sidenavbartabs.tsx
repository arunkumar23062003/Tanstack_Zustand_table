import { AccountJSON } from "@/config/accountjson";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

const SideNavbarTabs = ({ isCollapsible }: { isCollapsible: boolean }) => {
  const path = usePathname();
  return (
    <div className="">
      {AccountJSON.map((data, index) => {
        return (
          <Link
            key={index}
            href={data.pathValue}
            className={`flex flex-row items-center gap-2 text-gray-700 p-2  rounded-sm ${
              path === data.pathValue
                ? "bg-blue-600 text-blue-100"
                : "bg-inherit text-inherit hover:bg-gray-200"
            }`}
          >
            <TooltipProvider>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <div className={`text-xl ${path === data.pathValue ? "text-white": "text-gray-700"}`}>{data.icon}</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-black text-xs p-2 bg-white">{data.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!isCollapsible && (
              <p
                className={`${
                  path === data.pathValue ? "text-white" : "text-theme"
                } ml-4 font-medium`}
              >
                {data.name}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default SideNavbarTabs;
