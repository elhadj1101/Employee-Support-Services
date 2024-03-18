import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../api/auth";
import "./SignUpForm.css";
<<<<<<< HEAD
import { signUp } from "api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom";

>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
const SignUpForm = () => {
  // const [err, setErr] = useState("");
  // const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  // const [tel, setTel] = useState("");
  // const [telError, setTelError] = useState("");

  const [pass, setPass] = useState("");
  const [confpass, setConfpass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confpassError, setConfpassError] = useState("");
<<<<<<< HEAD
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    let correct = true;
=======
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
    e.preventDefault();
    // Validate email
    if (!email.trim()) {
      correct = false;
      setEmailError("Email is required.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      correct = false;

      setEmailError("Invalid email format.");
      return;
    } else {
      setEmailError("");
    }

<<<<<<< HEAD
    // // Validate telephone
    // if (!tel.trim()) {
    //   setTelError("Phone number is required.");
    // } else if (!/^\d{10}$/.test(tel)) {
    //   setTelError("Invalid phone number format.");
    // } else {
    //   setTelError("");
    // }
=======
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
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888

    // Validate password
    if (!pass.trim()) {
      setPassError("Password is required.");
<<<<<<< HEAD
      correct = false;

    } else if (pass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      correct = false;

=======
      return;
    } else if (pass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
    } else {
      setPassError("");
    }

    // Validate confirmation password
    if (!confpass.trim()) {
      setConfpassError("The confirmation is required.");
<<<<<<< HEAD
      correct = false;

    } else if (confpass !== pass) {
      setConfpassError("Passwords do not match.");
      correct = false;

    } else {
      setConfpassError("");
    }
    if (!correct) {
      return;
    }
    // If all validations pass, submit the form
    try {
      const response = await signUp(email, pass);
      console.log('error' , response);

      if (response.success) {
        toast.success(response.success);

        navigate("/");
      }
    }catch (response) {
      console.log('error' , response);
      if (response.status === 401){
        toast.error(response.data.detail)
      }
    }
=======
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
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
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
<<<<<<< HEAD
        <p className="error max-w-xs flex mx-auto sm:min-w-full ">{emailError}</p>
{/* 
        <label for="phone" className="text max-w-xs mx-auto flex  sm:min-w-full">
=======
        <p className="error max-w-xs flex mx-auto sm:min-w-full ">
          {emailError}
        </p>

        <label
          htmlFor="phone"
          className="text max-w-xs mx-auto flex  sm:min-w-full"
        >
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
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
<<<<<<< HEAD
        <div className="error max-w-xs flex mx-auto sm:min-w-full">{telError}</div> */}
=======
        <div className="error max-w-xs flex mx-auto sm:min-w-full">
          {telError}
        </div>
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888

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
<<<<<<< HEAD
        <div className="error max-w-xs flex mx-auto sm:min-w-full  ">{confpassError}</div>
        <button className="inscri cursor-pointer  max-w-xs mx-11   sm:min-w-full sm:mx-auto  bg-blue-700" onClick={handleSubmit}>
=======
        <div className="error max-w-xs flex mx-auto sm:min-w-full  ">
          {confpassError}
        </div>
        <button
          className="inscri  max-w-xs mx-11   sm:min-w-full sm:mx-auto  "
          onClick={handleSubmit}
        >
>>>>>>> e4916c51928a5e857bbc2dab5a16bff1f9f90888
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
