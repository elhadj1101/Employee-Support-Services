import { useLocation } from "react-router-dom";
import useStore from "../../store/index.js";
import { FiLogOut } from "react-icons/fi";
function Navbar({}) {
  const { user, logout } = useStore();
  const location = useLocation();
  return (
    <div className="z-50 h-[60px] sticky top-0 w-full bg-[white]   py-4 px-6">
      <div className=" justify-between h-full items-center w-full flex gap-x-5 pr-3">
        {!(user && user.is_superuser) ? (
          <>
            <h1 className="text-lg font-bold">Salut, {user && (user.first_name +" " +user.last_name)}</h1>
            <div className="flex py-0.5 rounded-sm duration-300 transition cursor-pointer hover:bg-custom-gray/20 px-2 items-center gap-x-4">
          
              <img
                width={30}
                height={30}
                className="rounded-full"
                alt="profile pic"
                src="/assets/pilot.png"
              />
              <img src="./icons/notifications.svg" alt="" />
              <button onClick={logout}>
                <FiLogOut className="text-2xl" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-baseText text-lg font-bold flex justify-between w-full items-center">
              <>
              {location.pathname
                .replace("/", "")
                .split("/")
                .map(
                  (path) =>
                    path.charAt(0).toUpperCase() +
                    path.slice(1).replace(/-/g, " ")
                )
                .join(" > ")}
              </>
              <div className="flex items-center gap-6">
              <img src="./icons/notifications.svg" alt="" />
              <button onClick={logout}>
                <FiLogOut className="text-2xl" />
              </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
