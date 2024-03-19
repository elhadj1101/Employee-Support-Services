import React from "react";
import Navbar from "../Components/layout/Navbar";
import Sidebar from "Components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useStore from "../store/index.js";
import { getUsers } from "../api/auth.js";

function Dashboard() {
  const { setAdminUsers, user, fetchedAdminUsers, setFetchedAdminUsers } =
    useStore();
  React.useEffect(() => {
    async function fetchData() {
      const dat = await getUsers();
      console.log("fetch");
      setAdminUsers(dat);
      setFetchedAdminUsers(true);
    }
    if (user && user.is_superuser && !fetchedAdminUsers) fetchData();
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
