import axios from 'axios';
// import { axiosInstance } from "../../config"
// "proxy": "http://localhost:3000/"

// const API_URL = '/api/auth/'
const API_URL = 'https://listing-back.herokuapp.com/users/';

//Signup User (axios)
const signup = async userData => {
  const response = await axios.post(API_URL + 'signup', userData);

  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data));
  // }

  return response.data;
};

//Login User (axios)
const login = async userData => {
  const response = await axios.post(API_URL + 'login', userData);

  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data));
  // }

  return response.data;
};

//Logout User (axios)
const logout = async () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
  signup,
};

export default authService;
