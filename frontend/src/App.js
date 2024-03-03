import logo from './logo.svg';
import './App.css';
import SignUpForm from './Components/signUpForm/SignUpForm';
import LoginPage from './Components/loginForm/LoginForm'
import ResetPass from './Components/ResetPass/ResetPass';
import EmailVerificationForm from'./Components/emailVerificationForm/EmailVerificationForm'

function App() {
  return (
    <div>
     <SignUpForm/>
     <LoginPage/>
     <EmailVerificationForm/>
     <ResetPass/>


    
    </div>

    
  );
}

export default App;
