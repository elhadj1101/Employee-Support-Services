import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpForm.css";
const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");
  const [passError, setPassError] = useState("");
  const [confpassError, setConfpassError] = useState("");

  const handleSubmit = async (e) => {
    let correct = true;
    e.preventDefault();
    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }

    // Validate telephone
    if (!tel.trim()) {
      setTelError("Phone number is required.");
    } else if (!/^\d{10}$/.test(tel)) {
      setTelError("Invalid phone number format.");
    } else {
      setTelError("");
    }

    // Validate password
    if (!pass.trim()) {
      setPassError("Password is required.");
    } else if (pass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
    } else {
      setPassError("");
    }

    // Validate confirmation password
    if (!confpass.trim()) {
      setConfpassError("The confirmation is required.");
    } else if (confpass !== pass) {
      setConfpassError("Passwords do not match.");
    } else {
      setConfpassError("");
    }
    if (!correct) {
      return;
    }
    // If all validations pass, submit the form
    try {
      const response = await signUp(email, pass);
      if (response.success) {
        toast.success(response.success);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div >
      <div className="header">
        <div className="logo">
          <img src='./assets/esi sba 3.png' alt="icon" />
        </div>
        <div className=" my-4 px-5 sm:px-10  ">
          Merci d'entrer vos informations de connexion
        </div>
      </div>
      <form className=" ">
        <lablel for="email" className="text  max-w-xs mx-auto flex  sm:min-w-full">
          Address e-mail
        </lablel>
        <input
          className="  max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full  "
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          style={{ borderColor: emailError ? "red" : "" }}
        />
        <p className="error max-w-xs flex mx-auto sm:min-w-full ">{emailError}</p>

        <label for="phone" className="text max-w-xs mx-auto flex  sm:min-w-full">
          Num Téléphone
        </label>
        <input
          className=" max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full"
          name="phone"
          type="text/number"
          pattern=".{10,10}"
          placeholder="0723343134"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          style={{ borderColor: telError ? "red" : "" }}
        />
        <div className="error max-w-xs flex mx-auto sm:min-w-full">{telError}</div>

        <label for="password" className="text max-w-xs mx-auto flex  sm:min-w-full">
          Mot de passe
        </label>
        <input
          className=" max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full"
          name="password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="**************"
          style={{ borderColor: passError ? "red" : "" }}
        />
        <div className="error max-w-xs flex mx-auto sm:min-w-full">{passError}</div>
        <label for="confirm-password" className="text max-w-xs mx-auto flex  sm:min-w-full">
          Confirmer mot de passe
        </label>
        <input
          className="max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full"
          name="confirm-password"
          type="password"
          value={confpass}
          onChange={(e) => setConfpass(e.target.value)}
          placeholder="**************"
          style={{ borderColor: confpassError ? "red" : "" }}
        />
        <div className="error max-w-xs flex mx-auto sm:min-w-full  ">{confpassError}</div>
        <button className="inscri  max-w-xs mx-11   sm:min-w-full sm:mx-auto  " onClick={handleSubmit}>
          s'inscrire
        </button>

        <div className="connecter justify-center">
          Vous possédez déjà un compte? <Link to='/' > <span>Se connecter</span> </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
