import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginSignup from './Components/loginSignup/LoginSignup';

function App() {
  return (
    <div>
      <LoginSignup/>
    </div>

    
  );
}

export default App;
