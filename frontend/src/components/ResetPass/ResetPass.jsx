import React, { useState } from 'react';
import './ResetPass.css'
import { Link } from 'react-router-dom';

const ResetPass = () => {
    const [pass, setPass] = useState('');
    const [confpass, setConfpass] = useState('');
    const [passError, setPassError] = useState('');
    const [confpassError, setConfpassError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pass.trim()) {
            setPassError('Password is required.');
        } else {
            setPassError('');
        }

        // Validate confirmation password
        if (!confpass.trim()) {
            setConfpassError('The confirmation is required.');
        } else if (confpass !== pass) {
            setConfpassError('Passwords do not match.');
        } else {
            setConfpassError('');
        }
    };
    return (
        <div  >
            <div className="header">
                <div className="logo">
                    <img src='./assets/esi sba 3.png' alt="icon" />
                </div>
                <div className=" font-semibold my-4  sm:px-10">Merci d'entrer un nouveau mot de passe</div>
            </div>
            <div >

                <div >

                    <>
                        <div className=" font-medium flex mx-auto sm:min-w-full sm:flex sm:mx-auto">Nouveau mot de passe</div>
                        <input class=" max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full " type="password " value={pass} onChange={(e) => setPass(e.target.value)} placeholder='**************' style={{ borderColor: passError ? 'red' : '' }} />
                        <p className="error  sm:min-w-full">{passError}</p>
                    </>



                </div>
                <div >

                    <>
                        <div className=" font-medium mt-4  sm:min-w-full">Confirmer votre mot de passe</div>
                        <input class=" max-w-xs flex mx-auto  sm:flex sm:mx-auto sm:min-w-full" type="password" value={confpass} onChange={(e) => setConfpass(e.target.value)} placeholder='**************' style={{ borderColor: confpassError ? 'red' : '' }} />
                        <p className="error  sm:min-w-full">{confpassError}</p>
                    </>

                </div>
            </div>
            <div className="Modifier max-w-xs mx-11   sm:min-w-full sm:mx-auto " onClick={handleSubmit}>Modifier</div>
            <div className="retour justify-center">
                <Link to={'/'}> Retour à la page connexion</Link>
            </div>

        </div>
    );
}

export default ResetPass;
