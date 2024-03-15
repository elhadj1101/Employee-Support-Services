import Axios from "./axios";
import { jwtDecode } from "jwt-decode";



const login = async (email, password) => {
  try {
    const response = await Axios.post('/login/', JSON.stringify({ email, password }));
  
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = async () => {
    try {
      const response = await Axios.get('/logout');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

const signUp = async (email, password) => {
  try {
    const response = await Axios.post('/signup/', JSON.stringify({ email, password , password2 : password }));
   console.log(response);
    // return response.data;
  } catch (error) {
    // ki tjik response b status code 400 wla rah td5l hna manupiliha

    // throw error.response;
     console.log(error.response["data"]);
  }
};

const verifyEmail = async (verificationCode) =>{

    try{
     const response = await Axios.get(`/verifyemail/${verificationCode}`);
     return response.data;
    } catch(error){
        throw error.response.data;
    }
}


const getUserData = async () => {
  
  const decodedToken = jwtDecode( localStorage.getItem('access_token'));
  const userId = decodedToken.user_id;

  try {
    const response = await Axios.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export { login, logout , signUp , verifyEmail ,getUserData };
