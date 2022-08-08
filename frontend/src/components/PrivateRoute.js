import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import {user} from '../features/auth/authSlice'

const PrivateRoute = () => {
   const {user} = useSelector((state)=>state.authSlice)
  // if (checkingStatus) {
  //   <Spinner />;
  
  // }
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoute