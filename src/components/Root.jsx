import { useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
