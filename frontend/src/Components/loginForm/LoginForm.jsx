import React ,{useState} from 'react'
import esi from '../Assets/esi sba 3.png'
import './LoginForm.css';


const LoginForm = () => {
        const [email, setEmail] = useState('');
         const [pass, setPass] = useState('');
         const [emailError, setEmailError] = useState('');
         const [passError, setPassError] = useState('');
          const handleSubmit = (e) => {
        e.preventDefault();

        // Validate email
        if (!email.trim()) {
            setEmailError('Email is required.');
        } else {
            setEmailError('');
        }
          if (!pass.trim()) {
            setPassError('Password is required.');
        } else {
            setPassError('');
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
                 <div className="input">

                    <>
                        <div className="text">Mot de passe</div>
                        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='**************' style={{ borderColor: passError ? 'red' : '' }} />
                        {passError && <div className="error">{passError}</div>}
                    </>



                </div>
            </div>
            
        </div>
    );
}
}

export default LoginForm;
