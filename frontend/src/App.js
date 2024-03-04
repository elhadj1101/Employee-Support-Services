import './App.css';
import Login from './pages/Login';
import  Signup from './pages/Signup'

import { Route , Routes } from 'react-router-dom';
function App() {
  return (
    <main className='h-screen w-full'>
     <Routes>
         <Route exact path='/' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
       </Routes>
    </main>

    
  );
}

export default App;
