import DoorBottom from "@/components/Door/DoorBottom";
import DoorTop from "@/components/Door/DoorTop";
import Logo from "@/components/Door/Logo";
import { ReactNode } from "react";

const DoorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DoorTop />
      <Logo />
      <DoorBottom />
      {children}
    </>
  );
};

export default DoorLayout;
