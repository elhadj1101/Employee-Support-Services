import AddUser from "./pages/admin/AddUser";
import "./App.css";
import Reset from "./pages/ResetPassword"
import Email from "./pages/Email"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InitialDashboard from "./pages/employee/InitialDashboard";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import { Route, Routes, Outlet } from "react-router-dom";
import Users from "./pages/admin/Users";
import { Toaster } from "sonner";
import RequireAuth from "./RequireAuth";
import Loan from "pages/Loan";

import UserProfile from "pages/admin/UserProfile";
import FinancialAid from "pages/employee/FinancialAid";
import ListLoans from "pages/employee/ListLoans";
import ListAids from "pages/employee/ListAids";
import EmployeesRequests from "pages/commite/EmployeesRequests";
import SingleDemandLoan from "pages/SingleDemandLoan";
import SingleDemandAid from "pages/SingleDemandAid";
import Popup from "components/Popup";
function App() {
  return (
    <main className="h-screen w-full">
      <Routes>
        {/* public routes */}
        <Route  path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email" element={<Email />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
{/*         <Route path="/pop" element={<Popup />} />
 */}

     

      {/*   <Route path="/test/" element={<Dashboard />} >
            <Route path="demande-pret" element={<Loan />} /> 
        </Route>   */}
        {/* protected routes */}
        <Route element={<RequireAuth requiredRoles={["any"]} />}>
          <Route path="/" element={<Dashboard />}>
            <Route element={<RequireAuth requiredRoles={["admin"]} />}>
              <Route  path="utilisateurs/add-user" element={<AddUser />} />
              <Route path="utilisateurs" element={<Users />} />
              <Route path="utilisateurs/:userId" element={<UserProfile />} />
            </Route>
            <Route element={<RequireAuth requiredRoles={["any"]} excludedRoles={[]} />} >
              <Route path="" element={<InitialDashboard />} />
              <Route path="demande-pret" element={<Loan />} />
              <Route path="demande-pret/:lDId" element={<Loan />} />

              <Route path="demande-aide-financiere" element={<FinancialAid />} />
              <Route path="demande-aide-financiere/:aDId" element={<FinancialAid />} />

              <Route path="liste-demandes-pret" element={<ListLoans />} />
              <Route path="liste-demandes-pret/:dmId" element={<SingleDemandLoan employee={true}   />} />
              <Route path="liste-demandes-aide-financiere" element={<ListAids />} />
              <Route path="liste-demandes-aide-financiere/:dmId" element={<SingleDemandAid employee={true}  /> } />

            <Route element={<RequireAuth requiredRoles={["any"]} excludedRoles={["employe"]} />} >
              <Route path="demandes-employe" element={<EmployeesRequests/>} />
              <Route path="demandes-employe/pret/:dmId" element={<SingleDemandLoan  employee={false} />} />
              <Route path="demandes-employe/aid/:dmId" element={<SingleDemandAid employee={false} />} />

            </Route>
            </Route>
          </Route>

        
        </Route>
      </Routes>
      <Toaster richColors closeButton position="bottom-right" />
    </main>
  );
}

export default App;
