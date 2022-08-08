import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.authSlice
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h1>
        <FaUser />
        Login
      </h1>
      <p>Please Enter your Login Details</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary align-center">Login</button>
        </div>
      </form>
    </>
  );
}
