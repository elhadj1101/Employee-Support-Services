import AddUser from "./pages/admin/AddUser";
import "./App.css";
import Reset from "./pages/ResetPassword"
import Email from "./pages/Email"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import { Route, Routes, Outlet } from "react-router-dom";
import Users from "./pages/admin/Users";
import { Toaster } from "sonner";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <main className="h-screen w-full">
      <Routes>
        {/* public routes */}
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email" element={<Email />} />
        <Route path="/reset" element={<Reset />} />




        {/* protected routes */}
        <Route element={<RequireAuth requiredRoles={["any"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth requiredRoles={["admin"]} />}>
              <Route path="utilisateurs/add-user" element={<AddUser />} />
              <Route path="utilisateurs" element={<Users />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Toaster richColors closeButton position="bottom-right" />
    </main>
  );
}

export default App;
