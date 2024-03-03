import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpForm from './Components/signUpForm/SignUpForm';
import LoginForm from './Components/loginForm/LoginForm';

function App() {
  return (
    <div>
      <LoginForm/>
    </div>

    
  );
}

export default App;
