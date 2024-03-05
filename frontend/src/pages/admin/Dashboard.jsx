import React from "react";
import Navbar from "../../Components/layout/Navbar";
import TestTable from "../../Components/Admin/UsersTable/TestTable";

function Dashboard() {
  return (
    <>
      <Navbar path={"utilisateurs"} />
      <div className="w-full h-screen    bg-lightgray">
        <div className="px-6 py-2">
          <h1 className="text-3xl text-black font-bold">
            Listes des utilisateurs
          </h1>
          <TestTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
