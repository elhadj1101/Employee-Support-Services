import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../api/auth";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  // const [err, setErr] = useState("");
  // const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  // const [tel, setTel] = useState("");
  // const [telError, setTelError] = useState("");

  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    let correct = true;
    e.preventDefault();
    // Validate email
    if (!email.trim()) {

      setEmailError("l'email est requis.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {


      setEmailError("l'email est invalide.");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!pass.trim()) {
      setPassError("le mot de passe est requis.");
      correct = false;

    } else

    // if (pass.length < 8) {
    //   setPassError("Password must be at least 8 characters long.");
    //   correct = false;

    // } else 
    {
      setPassError("");
    }


    if (!correct) {
      return;
    }
    // If all validations pass, submit the form
    try {
      const response = await signUp(email, pass);
      
      if (response === 'success') {
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full  w-full p-4" >
      <div className="header ">
        <div className="logo">
          <img src="./assets/esi sba 3.png" alt="icon" />
        </div>
        <div className="text text-center my-4 sm:mx-auto sm:min-w-full  ">
          Merci d'entrer vos informations de connexion
        </div>
      </div>
      <form >
        <label
          htmlFor="email"
          className="text  max-w-xs mx-auto flex  sm:min-w-full"
        >
          Address e-mail
        </label>
        <input
          className=" input max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full  "
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
          htmlFor="password"
          className="text flex mx-auto max-w-xs  sm:min-w-full sm:flex"
        >
          Mot de passe (envoyé par l'administrateur)
        </label>
        <input
          className="input max-w-xs flex mx-auto   sm:flex sm:mx-auto sm:min-w-full md:min-w-full lg:min-w-full"
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

        <button
          className="inscri cursor-pointer  max-w-xs mx-11   sm:min-w-full sm:mx-auto  bg-blue-700"
          onClick={handleSubmit}
        >
          acitver
        </button>

        <div className=" sm:flex sm:justify-center mt-2  ">

          <div className=" pr-1 flex justify-center sm:flex sm:justify-center   ">
            Vous avez déjà activer votre compte?
          </div>
          <Link to="/">
            {" "}
            <span className=" text-blue-700 underline flex justify-center sm:flex sm:justify-center">Se connecter</span>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
