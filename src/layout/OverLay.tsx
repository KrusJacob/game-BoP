import React, { ReactNode } from "react";

const OverLay = ({ children }: { children: ReactNode }) => {
  return <div className="overlay">{children}</div>;
};

export default OverLay;
