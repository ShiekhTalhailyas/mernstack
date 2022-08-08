import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logOut, reset } from "../features/auth/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onlogOut = () => {
    dispatch(logOut(user));
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <Link to="/">Support Desk</Link>
        </div>
        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item" onClick={onlogOut}>
              <Link to="/">
                <FaSignOutAlt /> SignOut
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register">
                  <FaUserAlt /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}
