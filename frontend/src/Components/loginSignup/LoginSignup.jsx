import React, { useState } from 'react';
import "./LoginSignup.css"
import esi from '../Assets/esi sba 3.png'
import vector from '../Assets/icons8-right-arrow-32(1).png'

const LoginSignup = () => {
    const[email,setEmail]=useState('');
    const[tel,setTel]=useState('');
    const[pass,setPass]=useState('');
    const[confpass,setConfpass]=useState('');
    const[emailError,setEmailError]=useState('');
    const[telError,setTelError]=useState('');
    const[passError,setPassError]=useState('');
    const[confpassError,setConfpassError]=useState('');
    const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError('Email is required.');
    } else {
      setEmailError('');
    }
     if (!tel) {
      setTelError('Telphone number is required.');
    } else {
      setTelError('');
    }
     if (!pass) {
      setPassError('Password is required.');
    } else {
      setPassError('');
    }
     if (!confpass) {
        setConfpassError('The confirmation is required.');
    } else {
        setConfpassError('');
    }
}
    

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
                <div className="text">Merci d'entrer vos inforamtions de connexion</div>
            </div>
            <div className="inputes">
                <div className="input">
                    <div className="text" style={{color:emailError?'red':''}}>Address e-mail</div>
                    <input type='email' value={email} placeholder={'email'} style={{ borderColor: emailError ? 'red' : '' }} />
                    

                </div>
                <div className="input">
                    {showFields ? <><div className="text" style={{color:telError?'red':''}}>Num Téléphone</div><input type="tel" style={{ borderColor: telError ? 'red' : '' }} id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /></>
                        : <div></div>

                    }


                </div>
                <div className="input">
                    <div className="text" style={{color:passError?'red':''}}>Mot de passe</div>
                    <input type="password" placeholder='**************'  style={{ borderColor: passError ? 'red' : '' }}/>

                </div>
                <div className="input">
                    {showFields ? <><div className="text" style={{color:confpassError?'red':''}}>Confirmer mot de passe</div><input type="password" placeholder='**************' style={{ borderColor: confpassError ? 'red' : '' }} /></> :<div></div>}
                   
                </div>
                <div className="checking">
                    {showFields ?  <><input type="checkbox" name="" id="" /><div>j'accepte <span>les termes et les conditions d'utilisation.</span></div></>:<div className='resetpass'>Mot de passe oublié ?</div>}
                   
                </div>
                {showFields ?  <div className="inscri" onClick={handleSubmit}>s'inscrire</div>:<div className='loginbtn'>
                <div className="inscri" onClick={handleSubmit}>Se connecter  <img src={vector}/></div>
               
                    </div>}
                    {showFields ? <div className="connecter">Vous possédez déja un compte? <span onClick={handleSeConnecterClick} >Se connecter</span></div> :<div className="register">Vous n’avez pas de compte ?<span onClick={setShowFields}>Créer un compte</span> </div>}
               
               
            </div>


        </div>

    );
}

export default LoginSignup;
