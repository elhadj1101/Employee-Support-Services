import './App.css';
import Login from './pages/Login';
import  Signup from './pages/Signup'
<<<<<<< HEAD
import AddUser from './pages/admin/AddUser';
import Dashboard from './pages/admin/Dashboard'
import { Toaster } from './Components/ui/sonner';
=======
import Dashboard from './pages/admin/Dashboard'
>>>>>>> b992bc10d307482cd6126fe92d06ca92aa605c04
import { Route , Routes } from 'react-router-dom';

function App() {
  return (
    <main className='h-screen w-full'>
     <Routes>
         <Route exact path='/' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
<<<<<<< HEAD
         <Route path='/dashboard' >
          <Route index  element={<Dashboard />} />
          <Route path='add-user' element={<AddUser />} />
         </Route >
     </Routes>
     <Toaster richColors closeButton  position="bottom-right"  />
=======
         <Route path='/dashboard' element={<Dashboard />} />
       </Routes>
>>>>>>> b992bc10d307482cd6126fe92d06ca92aa605c04
    </main>

    
  );
}

export default App;
