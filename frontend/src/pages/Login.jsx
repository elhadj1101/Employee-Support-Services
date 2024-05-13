import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
export default function Login() {
  return (
    <section className="h-screen w-full  flex items-center  justify-center bg-gray-100">
      <div className="w-1/3 h-2/3 flex items-center justify-center bg-white rounded-xl shadow-lg ">

        <LoginForm />
      </div>
    </section>
  );
}
