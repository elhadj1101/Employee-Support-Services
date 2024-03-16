import Axios from "./axios";
// import { jwtDecode } from "jwt-decode";



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
    const data = response.data[0];
    return ["success", data['success']];

  } catch (error) {
    
     return ["error", error.response.data];
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
  
  // const decodedToken = jwtDecode( localStorage.getItem('access_token'));
  // const userId = decodedToken.user_id;

  try {
    // ndiro /user/ drct 5atar backend mn token y3rf wchmn user dar request
    const response = await Axios.get('/user/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export { login, logout , signUp , verifyEmail ,getUserData };
