import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useStore from "../store/index.js";
import { getUsers } from "../api/auth.js";
import { getOffres } from "../api/offres.js";
import {
  getLoans,
  getAids,
  getAllAids,
  getAllLoans,
  canApplyForLoan,
  getCommity,
} from "../api/requests.js";
import { getRecords } from "api/records";
import { getMeetings } from "api/meetings";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const usersDontSee = ["employe"];
  const toggleSidebar = () => {
    setOpen(!open);
  };
  const hideSidebar = () => {
    setOpen(false);
  };

  const {
    setCanApplyLoan,
    setAdminUsers,
    user,
    setAllLoans,
    fetchedAllLoans,
    setFetchedAllLoans,
    setAllAids,
    fetchedAllAids,
    setFetchedAllAids,
    setAids,
    fetchedAids,
    setFetchedAids,
    setOffres,
    setFetchedOffres,
    fetchedOffres,
    fetchedAdminUsers,
    setFetchedAdminUsers,
    setLoans,
    setFetchedLoans,
    fetchedLoans,
    setFetchedRecords,
    setRecords,
    fetchedRecords,
    setCommity,
    setFetchedCommity,
    fetchedCommity,
  } = useStore();
  React.useEffect(() => {
    async function fetchUsers() {
      const dat = await getUsers();

      setAdminUsers(dat);
      setFetchedAdminUsers(true);
    }
    async function fetchOffres() {
      const dat = await getOffres();
      setOffres(dat);
      setFetchedOffres(true);
    }
    async function fetchLoans() {
      const dat = await getLoans();
      const canApply = await canApplyForLoan();
      const cond = canApply === "True";
      setCanApplyLoan(cond);

      setLoans(dat);
      setFetchedLoans(true);
    }
    async function fetchAids() {
      const dat = await getAids();

      setAids(dat);
      setFetchedAids(true);
    }
    async function fetchAllAids() {
      const dat = await getAllAids();

      setAllAids(dat);
      setFetchedAllAids(true);
    }
    async function fetchAllLoans() {
      const dat = await getAllLoans();

      setAllLoans(dat);
      setFetchedAllLoans(true);
    }

    async function fetchRecords() {
      const dat = await getRecords();
      setRecords(dat);
      setFetchedRecords(true);
    }
    async function fetchCommity() {
      const dat = await getCommity();
      setCommity(dat);
      setFetchedCommity(true);
    }
    if (user && user.is_superuser && !fetchedAdminUsers) fetchUsers();
    if (user && user.role === "tresorier" && !fetchedRecords) fetchRecords();
    if (user && user.role === "tresorier" && !fetchedCommity) fetchCommity();
    if (!fetchedOffres) fetchOffres();
    if (!fetchedLoans) fetchLoans();
    if (!fetchedAids) fetchAids();
    if (!fetchedAllAids && user && !usersDontSee.includes(user.role))
      fetchAllAids();
    if (!fetchedAllLoans && user && !usersDontSee.includes(user.role))
      fetchAllLoans();

    //&& user && !user.is_superuser
  }, []);
  return (
    <div className="">
      <div
        className={`   ${
          open ? "z-[99] fixed top-0 -translate-x-full" : " hidden  lg:block "
        }`}
      >
        <Sidebar />
      </div>
      <div className=" lg:ml-[235px] flex flex-grow flex-col h-screen   ">
        <div className=" flex items-center sticky top-0 w-full z-30   ">
          <img
            className=" h-7 w-7 lg:hidden  "
            src="/icons/menu.png"
            alt=""
            onClick={toggleSidebar}
          />
          <Navbar />
        </div>
        <div onClick={hideSidebar} className="h-full">
          <Outlet />
        </div>
      </div>

    
  
    
    </div>
  );
}

export default Dashboard;
