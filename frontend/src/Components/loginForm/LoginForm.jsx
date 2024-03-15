import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }
    if (!pass.trim()) {
      setPassError("Password is required.");
    } else {
      setPassError("");
    }

    if (!valide) {
      return;
    }

    try {
      const response = await  login(email, pass);
      console.log(response);
      if (response) {
        
        toast.success("login success");
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        Axios.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/dashboard");
        try {
          // const user = await getUserData();
          const user = {role:'admin'}
          setUser(user);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <div className="header">
        <div className="logo">
          <img src="./assets/esi sba 3.png" alt="icon" />
        </div>
        <div className="text text-center my-4 sm:mx-auto sm:min-w-full">Merci d'entrer vos informations de connexion</div>
      </div>
      <form  >
        <label htmlFor="email" className="text flex  mx-auto sm: w-full sm:mx-auto ">Address e-mail</label>
        <input
          className="  w-full   sm:flex sm:mx-auto sm:w-96  "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          style={{ borderColor: emailError ? "red" : "" }}
        />
        <p className="error max-w-xs flex mx-auto sm:min-w-full">{emailError}</p>
        <label htmlFor="password" className="text flex mx-auto ">Mot de passe</label>
        <input
          className=" w-full  sm:flex sm:mx-auto sm:min-w-full"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="**************"
          style={{ borderColor: passError ? "red" : "" }}
        />
        <p className="error max-w-xs flex mx-auto sm:min-w-full">{emailError}</p>
        <div className="resetpass justify-center">
          <Link to={"/email"}>Mot de passe oublié ?</Link>
        </div>
        <div className="inscri flex mx-auto max-w-xs  sm:min-w-full sm:mx-auto" onClick={handleSubmit}>
          Se connecte
          <img src="./assets/icons8-right-arrow-32(1).png" alt="vector" />
        </div>
        <div className="register flex mx-auto ">
          Vous n’avez pas de compte ?
          <span>
            {" "}
            <Link to={"/signup"}>Créer un compte</Link>
          </span>{" "}
        </div>

      </form>



    </div>
  );
};

export default LoginForm;