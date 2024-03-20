import React from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useStore from "../store/index.js";
import { getUsers } from "../api/auth.js";
import { getOffres } from "../api/offres.js";
import { getLoans } from "../api/requests.js";

function Dashboard() {
  const {
    setAdminUsers,
    user,
    setOffres,
    setFetchedOffres,
    fetchedOffres,
    fetchedAdminUsers,
    setFetchedAdminUsers,
    setLoans,
    setFetchedLoans,
    fetchedLoans,
  } = useStore();
  React.useEffect(() => {
    async function fetchUsers() {
      const dat = await getUsers();
      console.log("fetched users");

      setAdminUsers(dat);
      setFetchedAdminUsers(true);
    }
    async function fetchOffres() {
      const dat = await getOffres();
      console.log("fetched offres");
      setOffres(dat);
      setFetchedOffres(true);
    }
    async function fetchLoans() {
      const dat = await getLoans();
      console.log("fetched loans");
      console.log(dat);

      setLoans(dat);
      setFetchedLoans(true);
    }
    if (user && user.is_superuser && !fetchedAdminUsers) fetchUsers();
    if (!fetchedOffres) fetchOffres();
    if (!fetchedLoans) fetchLoans();
  }, []);
  return (
    <div className=" ">
      <Sidebar />
      <div className=" ml-[250px] flex flex-col h-screen ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
