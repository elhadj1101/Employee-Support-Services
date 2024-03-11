import React, { useState } from 'react';
import './EmailVerifactionForm.css'
import { Button } from 'Components/ui/button';
import { Link } from 'react-router-dom';
const Reset = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate email
        if (!email.trim()) {
            setEmailError('Email is required.');
        } else {
            setEmailError('');
        }
    }
    return (
        <div>

            <div className="header">
                <div className="logo">
                    <img src='./assets/esi sba 3.png' alt="icon" />
                </div>
                <div class="text mt-4 px-5 sm:px-10">Merci d'entrer vos informations de connexion</div>
            </div>
            <div className="inputes">
                <div className="">
                    <div className=" max-w-xs mx-auto  sm:min-w-full">Address e-mail</div>
                    <input className=" max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full    " type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'email'} style={{ borderColor: emailError ? 'red' : '' }} />
                    <p className="error max-w-xs flex mx-auto sm:min-w-full ">{emailError}</p>
                </div>
            </div>

            <button class="inscri  max-w-xs mx-11   sm:min-w-full sm:mx-auto  " onClick={handleSubmit}>Se connecte</button>
            <span className='goback justify-center  '>
                <Link to={'/'}>Retour à la page connexion</Link></span>
        </div>



    );
}


export default Reset;
