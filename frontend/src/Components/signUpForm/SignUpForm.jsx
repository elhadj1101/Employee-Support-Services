import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../api/auth";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  // const [err, setErr] = useState("");
  // const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telError, setTelError] = useState("");
  const [passError, setPassError] = useState("");
  const [confpassError, setConfpassError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      return;
    } else {
      setEmailError("");
    }

    // Validate telephone
    if (!tel.trim()) {
      setTelError("Phone number is required.");
      return;
    } else if (!/^\d{10}$/.test(tel)) {
      setTelError("Invalid phone number format.");
      return;
    } else {
      setTelError("");
    }

    // Validate password
    if (!pass.trim()) {
      setPassError("Password is required.");
      return;
    } else if (pass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    } else {
      setPassError("");
    }

    // Validate confirmation password
    if (!confpass.trim()) {
      setConfpassError("The confirmation is required.");
      return;
    } else if (confpass !== pass) {
      setConfpassError("Passwords do not match.");
      return;
    } else {
      setConfpassError("");
    }

    //here we have to perform the sign up request
    const res = await signUp(email, pass);
    if (res === "success") {
      navigate("/");
    }
  //   if (res[0] === "error") {
  //     setSuccess("");
  //     let kys = Object.keys(res[1][0]);

  //       setErr(kys[0] + ": " + res[1][0][kys[0]]);
      
  //   } else {
  //     // showing the success message then redirect to the login page
  //     setErr("");
  //     setSuccess(res[1]);
  //     let k = setTimeout(() => {
  //         navigate("/");
  //     }, 3000);
      
  //   }
  };

  return (
    <div>
      <div className="header max-w-xs">
        <div className="logo">
          <img src="./assets/esi sba 3.png" alt="icon" />
        </div>
        <div className="max-w-xs my-4 px-5 sm:px-10  ">
          Merci d'entrer vos informations de connexion
        </div>
        
      </div>
      <form className="max-w-xs">
        <label
          htmlFor="email"
          className="text  max-w-xs mx-auto flex  sm:min-w-full"
        >
          Address e-mail
        </label>
        <input
          className="  max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full  "
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"email"}
          style={{ borderColor: emailError ? "red" : "" }}
        />
        <p className="error max-w-xs flex mx-auto sm:min-w-full ">
          {emailError}
        </p>

        <label
          htmlFor="phone"
          className="text max-w-xs mx-auto flex  sm:min-w-full"
        >
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
        <div className="error max-w-xs flex mx-auto sm:min-w-full">
          {telError}
        </div>

        <label
          htmlFor="password"
          className="text max-w-xs mx-auto flex  sm:min-w-full"
        >
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
        <div className="error max-w-xs flex mx-auto sm:min-w-full">
          {passError}
        </div>
        <label
          htmlFor="confirm-password"
          className="text max-w-xs mx-auto flex  sm:min-w-full"
        >
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
        <div className="error max-w-xs flex mx-auto sm:min-w-full  ">
          {confpassError}
        </div>
        <button
          className="inscri  max-w-xs mx-11   sm:min-w-full sm:mx-auto  "
          onClick={handleSubmit}
        >
          s'inscrire
        </button>

        <div className="connecter justify-center">
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
