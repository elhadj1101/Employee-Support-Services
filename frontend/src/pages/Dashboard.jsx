import React from "react";
import Navbar from "../Components/layout/Navbar";
import Sidebar from "Components/layout/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className=" ">
      <Sidebar />
      <div className=" ml-[250px] flex flex-col h-screen ">
        <Navbar  />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
