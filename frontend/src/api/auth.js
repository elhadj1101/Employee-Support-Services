import { Axios } from "./axios";



const login = async (email, password) => {
  try {
    const response = await Axios.post('/login', JSON.stringify({ email, password }));
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

const signUp = async (name, email, password) => {
  try {
    const response = await Axios.post('/signup', Json.stringify({ name, email, password }));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const verifyEmail = async (verificationCode) =>{

    try{
     const response = await Axios.get(`/verifyemail/${verificationCode}`);
     return response.data;
    } catch{
        throw error.response.data;
    }
}
 

export { login, logout , signUp , verifyEmail };
