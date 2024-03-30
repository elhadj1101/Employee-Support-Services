import Axios from "./axios";
import { toast } from "sonner";

const roles = {
  vice_president: "Vice President",
  membre: "Membre Commute",
  employe: "Employee",
  president: "President",
  tresorier: "Tresorier",
  "": "Admin",
};
const canViewRequests = Object.keys(roles).filter((e) => !["tresorier", "employe", ""].includes(e))
const getUsers = async () => {
  try {
    const response = await Axios.get("/users/");
    const data = response.data;
    let dat = data.map((user) => {
      user["nom"] = user["first_name"];
      user["prenom"] = user["last_name"];
      user["telephone"] = user["phone_number"];
      user["role"] = roles[user["role"]] || "Employee";

      return user;
    });
    console.log("users", dat);
    return dat;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.detail);
      return [];
    } else {
      toast.error(
        " Une erreur s'est produite lors de la récupération des données."
      );
      return [];
    }
  }
};
const getUser = async (id) => {
  try {
    const response = await Axios.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.detail);
      return [];
    } else {
      toast.error(
        " Une erreur s'est produite lors de la récupération des données."
      );
      return [];
    }
  }
};
const updateUser = async (data, id) => {
  try {
    const response = await Axios.put(`/users/${id}/`, data);
    if (response.status === 200) {
      toast.success("Utilisateur modifer avec succès");
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.detail);
      return [];
    } else {
      toast.error(
        " Une erreur s'est produite lors de la récupération des données."
      );
      return [];
    }
  }
};
const login = async (email, password) => {
  try {
    const response = await Axios.post("/login/", { email, password });
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.log("error", error.request);
    if (error?.request?.status === 401) {
      toast.error(JSON.parse(error.request.response).detail);
    } else {
      toast.error("Une erreur s'est produite lors de la connexion.");
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
    const response = await Axios.post(
      "/signup/",
      JSON.stringify({ email, password })
    );
    const data = response.data[0];
    toast.success(data["success"]);
    return "success";
  } catch (error) {
    if (error.response) {
      console.log(error.response.data[0]);
      let kys = Object.keys(error.response.data[0]);

      toast.error(error.response.data[0][kys[0]]);
      return "error";
    } else {
      toast.error(
        "Une erreur s'est produite lors de la récupération des données."
      );
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
    const response = await Axios.get("/user/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteUser = async (id) => {
  // const decodedToken = jwtDecode( localStorage.getItem('access_token'));
  // const userId = decodedToken.user_id;

  try {
    // ndiro /user/ drct 5atar backend mn token y3rf wchmn user dar request
    const response = await Axios.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createUser = async (data) => {
  try {
    const response = await Axios.post("users/", data);
    return response;
  } catch (error) {
    if (error) {
      let keys = Object.keys(error.response.data);

      toast.error(error.response.data[keys[0]][0]);
    } else {
      toast.error(
        "Une erreur s'est produite lors de la récupération des données."
      );
    }
  }
};

export {
  getUsers,
  login,
  logout,
  signUp,
  verifyEmail,
  getUserData,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  canViewRequests,
};
