import './App.css';
import Login from './pages/Login';
import  Signup from './pages/Signup'
import AddUser from './pages/admin/AddUser';
import Dashboard from './pages/admin/Dashboard'
import { Toaster } from './Components/ui/sonner';
import { Route , Routes } from 'react-router-dom';

function App() {
  return (
    <main className='h-screen w-full'>
     <Routes>
         <Route exact path='/' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/dashboard' >
          <Route index  element={<Dashboard />} />
          <Route path='add-user' element={<AddUser />} />
         </Route >
     </Routes>
     <Toaster richColors closeButton  position="bottom-right"  />
    </main>

    
  );
}

export default App;
