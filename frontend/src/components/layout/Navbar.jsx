import { useLocation } from "react-router-dom";
import useStore from "../../store/index.js";
import { FiLogOut } from "react-icons/fi";
function Navbar({}) {
  const { user, logout } = useStore();
  return (
    <div className=" h-[60px]  w-full bg-[white]   py-4 px-6">
      <div className=" justify-between h-full items-center w-full flex gap-x-5 pr-3">
        {user && user.is_superuser ? (
          <>
            <h1 className="text-lg font-bold">
              Salut, {user && user.first_name + " " + user.last_name}
            </h1>
            <div className="flex py-0.5 rounded-sm duration-300 transition cursor-pointer hover:bg-custom-gray/20 px-2 items-center gap-x-4">
           
              <button onClick={logout}>
                <FiLogOut className="text-2xl" />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-lg font-bold">
              Salut, {user && user.first_name + " " + user.last_name}
            </h1>
            <div className="flex items-center gap-6">
              <button onClick={logout}>
                <FiLogOut className="text-2xl" />
            
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
