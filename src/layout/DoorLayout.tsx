import { ReactNode } from "react";

const DoorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* <DoorTop />
      <Logo />
      <DoorBottom /> */}
      {children}
    </>
  );
};

export default DoorLayout;
