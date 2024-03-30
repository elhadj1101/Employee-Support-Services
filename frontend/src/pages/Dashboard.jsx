import React, {useState} from "react";
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
} from "../api/requests.js";

function Dashboard() {
    const [open, setOpen] = useState(false);

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
      setOffres(dat);
      setFetchedOffres(true);
    }
    async function fetchLoans() {
      const dat = await getLoans();
      const canApply = await canApplyForLoan();
      const cond = canApply === "True";
      setCanApplyLoan(cond);
      console.log("fetched loans");

      setLoans(dat);
      setFetchedLoans(true);
    }
    async function fetchAids() {
      const dat = await getAids();
      console.log("fetched Aids");
      setAids(dat);
      setFetchedAids(true);
    }
    async function fetchAllAids() {
      const dat = await getAllAids();
      console.log("fetched All Aids");

      setAllAids(dat);
      setFetchedAllAids(true);
    }
    async function fetchAllLoans() {
      const dat = await getAllLoans();
      console.log("fetched All Loans");
      setAllLoans(dat);
      setFetchedAllLoans(true);
    }
    if (user && user.is_superuser && !fetchedAdminUsers) fetchUsers();
    if (!fetchedOffres ) fetchOffres();
    if (!fetchedLoans ) fetchLoans();
    if (!fetchedAids ) fetchAids();
    if (!fetchedAllAids && user && user.role !== "employe") fetchAllAids();
    if (!fetchedAllLoans && user && user.role !== "employe") fetchAllLoans();

    //&& user && !user.is_superuser


  }, []);
  return (
    <div className="h-screen  ">
      <div
        className={`   ${
          open ? "z-[99] fixed top-0 -translate-x-full" : " hidden  lg:block "
        }`}
      >
        <Sidebar />
      </div>
      <div className=" lg:ml-[250px] flex flex-col h-screen   ">
        <div className=" flex items-center cursor-pointer pl-3    ">
          <img
            className=" h-7 w-7 lg:hidden  "
            src="/icons/menu.png"
            alt=""
            onClick={toggleSidebar}
          />
          <Navbar />
        </div>
        <div onClick={hideSidebar} className="h-full  overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
