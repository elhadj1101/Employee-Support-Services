import React,{useState} from 'react';
import'./ResetPass.css'
import esi from '../Assets/esi sba 3.png'

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
        <div className='Container'>
         <div className="header">
                <div className="logo">
                    <img src={esi} alt="icon" />
                </div>
                <div className="text">Merci d'entrer un nouveau mot de passe</div>
            </div>
            <div className="inputes">

                <div className="input">

                    <>
                        <div className="text">Nouveau mot de passe</div>
                        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='**************' style={{ borderColor: passError ? 'red' : '' }} />
                        {passError && <div className="error">{passError}</div>}
                    </>



                </div>
                <div className="input">
                    
                        <>
                            <div className="text">Confirmer votre mot de passe</div>
                            <input type="password" value={confpass} onChange={(e) => setConfpass(e.target.value)} placeholder='**************' style={{ borderColor: confpassError ? 'red' : '' }} />
                            {confpassError && <div className="error">{confpassError}</div>}
                        </>
                    
                </div>
            </div>
            <div className='Modifier' onClick={handleSubmit}>Modifier</div>
            <div className="retour">Retour à la page connexion</div>
            
        </div>
    );
}

export default ResetPass;
