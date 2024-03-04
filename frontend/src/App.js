import './App.css';
import Login from './pages/Login';
import  Signup from './pages/Signup'
import Dashboard from './pages/admin/Dashboard'
import { Route , Routes } from 'react-router-dom';

function App() {
  return (
    <main className='h-screen w-full'>
     <Routes>
         <Route exact path='/' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/dashboard' element={<Dashboard />} />
       </Routes>
    </main>

    
  );
}

export default App;
