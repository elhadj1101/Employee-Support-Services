import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpForm.css";
import { signUp } from "api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");
  const [passError, setPassError] = useState("");
  const [confpassError, setConfpassError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let correct = true;
    e.preventDefault();
    // Validate email
    if (!email.trim()) {
      setEmailError("L'email est requis.");
      correct = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Format d'email invalide.");
      correct = false;
    } else {
      setEmailError("");
    }

    // Validate telephone
    if (!tel.trim()) {
      setTelError("Le numéro de téléphone est requis.");
      correct = false;
    } else if (!/^\d{10}$/.test(tel)) {
      setTelError("Format de numéro de téléphone invalide.");
      correct = false;
    } else {
      setTelError("");
    }

    // Validate password
    if (!pass.trim()) {
      setPassError("Le mot de passe est requis.");
      correct = false;
    } else if (pass.length < 8) {
      setPassError("Le mot de passe doit contenir au moins 8 caractères.");
      correct = false;
    } else {
      setPassError("");
    }

    // Validate confirmation password
    if (!confpass.trim()) {
      setConfpassError("La confirmation est requise.");
      correct = false;
    } else if (confpass !== pass) {
      setConfpassError("Les mots de passe ne correspondent pas.");
      correct = false;
    } else {
      setConfpassError("");
    }
    if (!correct) {
      return;
    }
    // If all validations pass, submit the form
    try {
      const response = signUp(email, pass);
      if (response.success) {
        toast.success(response.success);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container">
      <div className="header">
        <div className="logo">
          <img src="./assets/esi sba 3.png" alt="icon" />
        </div>
        <div className="text ">
          Merci d'entrer vos informations de connexion
        </div>
      </div>
      <form className="inputes">
        <lablel for="email" className="text">
          Address e-mail
        </lablel>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          style={{ borderColor: emailError ? "red" : "" }}
        />
        <p className="error ">{emailError}</p>

        <label for="phone" className="text">
          Num Téléphone
        </label>
        <input
          name="phone"
          type="text/number"
          pattern=".{10,10}"
          placeholder="0723343134"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          style={{ borderColor: telError ? "red" : "" }}
        />
        <div className="error">{telError}</div>

        <label for="password" className="text">
          Mot de passe
        </label>
        <input
          name="password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="**************"
          style={{ borderColor: passError ? "red" : "" }}
        />
        <div className="error">{passError}</div>
        <label for="confirm-password" className="text">
          Confirmer mot de passe
        </label>
        <input
          name="confirm-password"
          type="password"
          value={confpass}
          onChange={(e) => setConfpass(e.target.value)}
          placeholder="**************"
          style={{ borderColor: confpassError ? "red" : "" }}
        />
        <div className="error">{confpassError}</div>
        <button className="inscri" onClick={handleSubmit}>
          s'inscrire
        </button>

        <div className="connecter">
          Vous possédez déjà un compte?{" "}
          <Link to="/">
            {" "}
            <span>Se connecter</span>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
