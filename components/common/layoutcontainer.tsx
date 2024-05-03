import React from "react";

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return <div className="w-full h-full overflow-auto">{children}</div>;
};

export default LayoutContainer;
