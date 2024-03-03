import React,{useState} from 'react';
import esi from'../Assets/esi sba 3.png'
import './EmailVerifactionForm.css'
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
        <div className='Container'>
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
                </div>

                 <div className="inscri" onClick={handleSubmit}>Se connecte</div>
                 <div className='goback'>Retour à la page connexion</div>
            
        </div>
    );
}


export default Reset;
