import { useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar({ path }) {
  const [isAdmin, setIsAdmin] = useState(true);
  const location = useLocation();
  return (
    <div className="    h-[60px]  top-0 w-full bg-[white]   py-4 px-6">
      <div className=" justify-between h-full items-center w-full flex gap-x-5 pr-3">
        {!isAdmin ? (
          <>
            <h1>User</h1>
            <div className="flex py-0.5 rounded-sm duration-300 transition cursor-pointer hover:bg-custom-gray/20 px-2 items-center gap-x-2">
              <img
                width={30}
                height={30}
                className="rounded-full"
                alt="profile pic"
                src="/assets/pilot.png"
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-baseText text-lg font-bold">{
              location.pathname.replace('/', '')
                .split('/')
                .map(path => path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '))
                .join(' > ')
            }</div>
          </>
        )}
        <img className=" cursor-pointer" src="./icons/notifications.svg" alt="" />
      </div>
    </div>
  );
}

export default Navbar;
