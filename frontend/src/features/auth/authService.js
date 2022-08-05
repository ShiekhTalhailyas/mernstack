import axios from "axios";

const API_URL = "/api/user/";

// Register user
const registerBE = async (userData) => {
  
  const response = await axios.post(API_URL, userData);
  console.log("axios response", response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logInBE = async (userData) => {
  console.log("authservice backend");
  const response = await axios.post(API_URL + 'login', userData);
  console.log("axios response about login", response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

const logOutBE = () => {
  localStorage.removeItem("user");
};
const authService = {
  registerBE,
  logOutBE,
  logInBE
};

export default authService;
