import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.authSlice);
  console.log(user);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  console.log("loggedIN:", loggedIn, "CS", checkingStatus);
  return { loggedIn, checkingStatus };
};

// useEffect(() => {
//   if (user) {
//     setLoggedIn(true);
//   } else {
//     setLoggedIn(false);
//   }
//   setcheckingStatus(false);
// }, [user]);

export default useAuthStatus;
