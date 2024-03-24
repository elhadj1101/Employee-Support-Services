import React, {useState} from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import useStore from "../store/index.js";
import { getUsers } from "../api/auth.js";
import { getOffres } from "../api/offres.js";
import { getLoans } from "../api/requests.js";

function Dashboard() {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
      setOpen(!open);
    };
    const hideSidebar = () => {
      setOpen(false);
    };

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
      setOffres(dat);
      setFetchedOffres(true);
    }
    async function fetchLoans() {
      const dat = await getLoans();
      console.log("fetched loans");

      setLoans(dat);
      setFetchedLoans(true);
    }
    if (user && user.is_superuser && !fetchedAdminUsers) fetchUsers();
    if (!fetchedOffres && user && !user.is_superuser) fetchOffres();
    if (!fetchedLoans && user && !user.is_superuser) fetchLoans();
  }, []);
  return (
    <div className=" ">
      <div
        className={`   ${
          open ? "z-[99] fixed top-0 -translate-x-full" : " hidden  lg:block "
        }`}
      >
        <Sidebar />
      </div>
      <div className=" lg:ml-[250px] flex flex-col h-screen   ">
        <div className="  flex items-center cursor-pointer ml-3    ">
          <img
            className=" h-7 w-7 lg:hidden  "
            src="/icons/menu.png"
            alt=""
            onClick={toggleSidebar}
          />
          <Navbar />
        </div>
        <div onClick={hideSidebar}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
