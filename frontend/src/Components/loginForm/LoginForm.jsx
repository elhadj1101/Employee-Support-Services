import React, { useState } from "react";
import "./LoginForm.css";
import { getUserData, login } from "api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Axios from "api/axios";
import useStore from "../../store/index";
const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valider le format de l'e-mail
    let valide = true;
    if (!email.trim()) {
      setEmailError("L'adresse e-mail est requise.");
      valide = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Format d'adresse e-mail invalide.");
      valide = false;
    } else {
      setEmailError("");
    }

    // Valider le mot de passe
    if (!pass.trim()) {
      setPassError("Le mot de passe est requis.");
      valide = false;
    } else {
      setPassError("");
    }

    if (!valide) {
      return;
    }

    try {
      const response = login(email, pass);
      if (response.success) {
        navigate("/dashboard");
        toast.success(response.success);
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        Axios.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        try {
          const user = await getUserData();
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
    <div className="Container">
      <div className="header">
        <div className="logo">
          <img src="./assets/esi sba 3.png" alt="icon" />
        </div>
        <div className="text">Merci d'entrer vos informations de connexion</div>
      </div>
      <div className="inputes">
        <div className="input">
          <div className="text">Address e-mail</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"email"}
            style={{ borderColor: emailError ? "red" : "" }}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="input">
          <>
            <div className="text">Mot de passe</div>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="**************"
              style={{ borderColor: passError ? "red" : "" }}
            />
            {passError && <div className="error">{passError}</div>}
          </>
        </div>
        <div className="resetpass">Mot de passe oublié ?</div>
        <div className="inscri" onClick={handleSubmit}>
          Se connecte{" "}
          <img src="./assets/icons8-right-arrow-32(1).png" alt="vector" />
        </div>
        <div className="register">
          Vous n’avez pas de compte ?<Link to='/signup'><span>Créer un compte</span></Link> {" "}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
