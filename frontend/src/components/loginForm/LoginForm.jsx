import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Axios from "api/axios";
import { login } from "api/auth";
import useStore from "../../store/index";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const { setUser } = useStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valide = true;
    // Validate email
    if (!email.trim()) {
      valide = false;
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }
    if (!pass.trim()) {
      valide = false;

      setPassError("Password is required.");
    } else {
      setPassError("");
    }

    if (!valide) {
      return;
    }

    try {
      const response = await login(email, pass);
      if (response) {
        toast.success("login success");
        
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        Axios.defaults.headers["Authorization"] =
          "JWT " + response.access;
        //navigate("/dashboard");
        try {
          const decodedToken = jwtDecode(response.access);
          setUser(decodedToken);
          navigate("/");

          // const user = {role:'admin'}
          // setUser(user);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      }
    } catch (error) {
      toast.error(" Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <img src="./assets/esi sba 3.png" alt="icon" />
        </div>
        <div className="text text-center my-4 sm:mx-auto sm:min-w-full">
          Merci d'entrer vos informations de connexion
        </div>
      </div>
      <form>
        <label
          htmlFor="email"
          className="text flex  mx-auto sm: w-full sm:mx-auto "
        >
          Address e-mail
        </label>
        <input
          className="  w-full  input sm:flex sm:mx-auto sm:w-96  "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          style={{ borderColor: emailError ? "red" : "" }}
        />
        <p className="error max-w-xs flex mx-auto sm:min-w-full">
          {emailError}
        </p>
        <label htmlFor="password" className="text flex mx-auto ">
          Mot de passe
        </label>
        <input
          className=" w-full input sm:flex sm:mx-auto sm:min-w-full"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="**************"
          style={{ borderColor: passError ? "red" : "" }}
        />
        <p className="error max-w-xs flex mx-auto sm:min-w-full">
          {emailError}
        </p>
        <div className="resetpass justify-center">
          <Link to={"/email"}>Mot de passe oublié ?</Link>
        </div>
        <div
          className="inscri cursor-pointer bg-blue-700 flex mx-auto max-w-xs  sm:min-w-full sm:mx-auto"
          onClick={handleSubmit}
        >
          Se connecte
        </div>
        <div className="  sm:flex sm:justify-center ">

<div className="flex justify-center sm:flex sm:justify-center  ">
Vous n’avez pas de compte ?

</div>
<span className="  text-blue-700 underline flex justify-center sm:flex sm:justify-center">
{" "}
<Link to={"/signup"}>activer votre compte</Link>
</span>{" "}
</div>
      </form>
    </div>
  );
};

export default LoginForm;
