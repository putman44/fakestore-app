import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Root = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      <Outlet />
    </>
  );
};

export default Root;
