import React, { useState } from 'react';
import "./LoginSignup.css"
import esi from '../Assets/esi sba 3.png'
import vector from '../Assets/icons8-right-arrow-32(1).png'

const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [pass, setPass] = useState('');
    const [confpass, setConfpass] = useState('');
    const [emailError, setEmailError] = useState('');
    const [telError, setTelError] = useState('');
    const [passError, setPassError] = useState('');
    const [confpassError, setConfpassError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate email
        if (!email.trim()) {
            setEmailError('Email is required.');
        } else {
            setEmailError('');
        }

        // Validate telephone
        if (!tel.trim()) {
            setTelError('Telephone number is required.');
        } else {
            setTelError('');
        }

        // Validate password
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

    const [showFields, setShowFields] = useState(true);
    const handleSeConnecterClick = () => {
        setShowFields(false);
    };



    return (
        <div className="Container">
            <div className="header">
                <div className="logo">
                    <img src={esi} alt="icon" />
                </div>
                <div className="text">Merci d'entrer vos informations de connexion</div>
            </div>
            <div className="inputes">
                <div className="input">
                    <div className="text">Address e-mail</div>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'email'} style={{ borderColor: emailError ? 'red' : '' }} />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="input">
                    {showFields &&
                        <>
                            <div className="text">Num Téléphone</div>
                            <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} style={{ borderColor: telError ? 'red' : '' }} />
                            {telError && <div className="error">{telError}</div>}
                        </>
                    }
                </div>
                <div className="input">

                    <>
                        <div className="text">Mot de passe</div>
                        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='**************' style={{ borderColor: passError ? 'red' : '' }} />
                        {passError && <div className="error">{passError}</div>}
                    </>



                </div>
                <div className="input">
                    {showFields &&
                        <>
                            <div className="text">Confirmer mot de passe</div>
                            <input type="password" value={confpass} onChange={(e) => setConfpass(e.target.value)} placeholder='**************' style={{ borderColor: confpassError ? 'red' : '' }} />
                            {confpassError && <div className="error">{confpassError}</div>}
                        </>
                    }
                </div>
                <div className="checking">

                    {showFields ? <><input type="checkbox" name="" id="" /><div>j'accepte <span>les termes et les conditions d'utilisation.</span></div></> :
                        <div className='resetpass' >Mot de passe oublié ?</div>}
                </div>
                {showFields ?
                    <div className="inscri" onClick={handleSubmit}>s'inscrire</div> :
                    <div className='loginbtn'>
                        <div className="inscri" onClick={handleSubmit}>Se connecter  <img src={vector} /></div>
                    </div>}
                {showFields ?
                    <div className="connecter">Vous possédez déjà un compte? <span onClick={handleSeConnecterClick}>Se connecter</span></div> :
                    <div className="register">Vous n’avez pas de compte ?<span onClick={() => setShowFields(true)}>Créer un compte</span> </div>}
            </div>
        </div>
    );
}

export default LoginSignup;

