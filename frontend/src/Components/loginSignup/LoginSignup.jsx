import React from 'react';
import"./LoginSignup.css"
import esi from '../Assets/esi sba 3.png'

const LoginSignup = () => {
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
                    <div className="text">Address e-mail</div>
                   <input type="email" placeholder='email' />
    
                </div>
                 <div className="input">
                 <div className="text">Num Téléphone</div>
                 <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
    
                </div>
                 <div className="input">
                 <div className="text">Mot de passe</div>
                    <input type="password" placeholder='**************' />
    
                </div>
                 <div className="input">
                 <div className="text">Confirmer mot de passe</div>
                    <input type="password" placeholder='**************' />
                </div>
                <div className="checking">
                <input type="checkbox" name="" id="" />
                <div>j'accepte <span>les termes et les conditions d'utilisation.</span></div>
                </div>
                
                <div className="inscri">s'inscrire</div>
                <div className="connecter">Vous possédez déja un compte? <span>Se connecter</span></div>
            </div>

            
         </div>   
    
    );
}

export default LoginSignup;
