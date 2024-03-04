import './App.css';
import LoginPage from './Components/loginForm/LoginForm'
import Dashboard from './pages/Dashboard';
import  Login  from './pages/Login';
import  Signup from './pages/Signup'

function App() {
  return (
    <main className='h-screen w-full'>
      <Dashboard />
     <Signup />
     <Login />
    </main>

    
  );
}

export default App;
