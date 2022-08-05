import React from "react";
import  useAuthStatus  from "../Hooks/AuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

 const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()
  
  console.log("logggedIn:", loggedIn, "checkingStatus:", checkingStatus);
  if (checkingStatus) {
    <Spinner />;
  
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoute