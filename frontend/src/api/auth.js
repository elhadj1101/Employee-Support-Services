import Axios from "./axios";
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
    if (error.response){
      toast.error(error.response.data.detail);
      return [];
    }else{
    toast.error("Une erreur s'est produite lors de la récupération des données.");
    return [];
    }

};
}
const login = async (email, password) => {
  try {
    const response = await Axios.post(
      "/login/",
      JSON.stringify({ email, password })
    );
    return response.data;
  } catch (error) {
    console.log('eror' , error.request);
    if (error?.request?.status === 401){
      toast.error(JSON.parse(error.request.response).detail)
    }else {
      toast.error("Une erreur s'est produite lors de la connexion.");
      console.log('eror wslna' ,);
    
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

const createUser = async (data) => {
  try {
    const response = await Axios.post("users/",data);
    return response ;
  }
  catch(error){
    throw error.response
  }
};

export { getUsers,login, logout , signUp , verifyEmail ,getUserData , createUser };
