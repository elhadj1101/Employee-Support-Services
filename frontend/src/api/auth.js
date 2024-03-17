import Axios from "./axios";
<<<<<<< HEAD
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
=======
// import { jwtDecode } from "jwt-decode";
import {  toast } from 'sonner'


const roles ={
  "vice_president":"Vice President",
  "membre_commute":"Membre Commute",
  "employe":"Employee",
  "president":"President",
  "tresorier":"Tresorier",
  "":"Admin"

}


const getUsers = async () => {
  try {
    const response = await Axios.get('/users/');
    const data = response.data;
      let dat = data.map((user) => { 
        user["nom"] = user["first_name"];
        user["prenom"] = user["last_name"];
        user["telephone"] = user["phone_number"];
        user["role"] = roles[user["role"]] || "Employee";
      return user;
      });
     
     return dat;
  } catch (error) {
    throw error;
  }

};
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
const login = async (email, password) => {
  try {
    const response = await Axios.post(
      "/login/",
      JSON.stringify({ email, password })
    );
    return response.data;
  } catch (error) {
    console.log('eror' , error.request);
    if (error.request.status === 401){
      toast.error(JSON.parse(error.request.response).detail)
    }
  }
};

const logout = async () => {
  try {
    const response = await Axios.get("/logout");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const signUp = async (email, password) => {
  try {
<<<<<<< HEAD
    const response = await Axios.post(
      "/signup/",
      JSON.stringify({ email, password, password2: password })
    );
    console.log(response);
     return response.data;
  } catch (error) {
    // ki tjik response b status code 400 wla rah td5l hna manupiliha
    //  3labali golt nsyi 9bel
    // throw error.response;
    console.log(error.response["data"]);
=======
    const response = await Axios.post('/signup/', JSON.stringify({ email, password , password2 : password }));
    const data = response.data[0];
    toast.success(data['success']);
    return "success";
  } catch (error) {
    if (error.response){
      console.log(error.response.data[0]);
      let kys = Object.keys(error.response.data[0]);

      toast.error(kys[0] + ": " + error.response.data[0][kys[0]]);  
      return "error";

    }else{
      toast.error("Something went wrong");
      return "error";
    
    }
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
  }
};

const verifyEmail = async (verificationCode) => {
  try {
    const response = await Axios.get(`/verifyemail/${verificationCode}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getUserData = async () => {
<<<<<<< HEAD
  const decodedToken = jwtDecode(localStorage.getItem("access_token"));
  const userId = decodedToken.user_id;
=======
  
  // const decodedToken = jwtDecode( localStorage.getItem('access_token'));
  // const userId = decodedToken.user_id;
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888

  try {
    // ndiro /user/ drct 5atar backend mn token y3rf wchmn user dar request
    const response = await Axios.get('/user/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createUser = async (data) => {
  try {
    const response = await Axios.post("users/",data);
    return response ;
  }
  catch(error){
    throw error.response
  }
};

<<<<<<< HEAD
export { login, logout, signUp, verifyEmail, getUserData  , createUser};
=======
export { getUsers,login, logout , signUp , verifyEmail ,getUserData };
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
