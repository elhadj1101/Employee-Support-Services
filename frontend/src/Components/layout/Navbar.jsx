import { useState } from "react";

function Navbar({ path }) {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <div className="h-[60px] w-full bg-[white]   py-4 px-6">
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
            <div className="text-baseText text-lg font-bold">{path}</div>
          </>
        )}
        <img src="./icons/notifications.svg" alt="" />
      </div>
    </div>
  );
}

export default Navbar;
