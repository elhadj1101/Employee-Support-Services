import Email from './pages/Email';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Dashboard from './pages/admin/Dashboard'
import { Route, Routes } from 'react-router-dom'
import ResetPass from './pages/ResetPassword';
function App() {
  return (
    <main className='h-screen w-full'>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/email' element={<Email />} />
        <Route path='/reset' element={<ResetPass />} />

      </Routes>
    </main>


  );
}

export default App;
