import React from "react";
import SignUpForm from "../components/signUpForm/SignUpForm";

export default function Signup() {
  return (
    <section className="h-full w-full  flex items-center    justify-center bg-gray-100">
      <div className="w-1/3 p-3 flex items-center justify-center bg-white rounded-xl shadow-lg ">
        <SignUpForm />
      </div>
    </section>
  );
}
