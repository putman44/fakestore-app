import { useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Root = ({ user, setUser }) => {
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
};

export default Root;
