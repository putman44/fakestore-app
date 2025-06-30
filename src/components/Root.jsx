import { useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Root = ({ user }) => {
  return (
    <>
      <NavBar user={user} />
      <Outlet />
    </>
  );
};

export default Root;
