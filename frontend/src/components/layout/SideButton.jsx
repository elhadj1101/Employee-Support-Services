import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export default function SideButton({ title, icon: Icon, nestedBtns  , to=''}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // Check if any child path matches the current location
  useEffect(() => {
    const isOpen = nestedBtns.some(
      ({ path }) => path.split("/").pop() === location.pathname.split("/").pop()
    );
    setOpen(isOpen);
  }, []);

  return (
    <div className=" mt-1">
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className={` ${
          nestedBtns.length === 0
            ? to.split("/").pop() === location.pathname.split("/").pop()
              ? "bg-[#4256D0]"
              : "hover:bg-[#4256D0]"
            : ""
        } flex items-center cursor-pointer text-white text-sm font-medium justify-between py-2 px-4 mx-1 rounded-[10px]`}
      >
        <div className=" py-1  flex justify-center items-center gap-3">
          {Icon && <Icon className="text-lg" />}
          <p className="capitalize tracking-wide ">{title}</p>
        </div>
        {!(nestedBtns.length === 0) &&
          (open ? <IoIosArrowUp /> : <IoIosArrowDown />)}
      </div>
      {open & (nestedBtns.length !== 0) ? (
        <div className="px-1 pt-2 pb-3 pl-3  bg-[#3842859e] ">
          {nestedBtns.map(({ titleBtn, Icon, path }, index) => (
            <Link
              to={path}
              key={index}
              className={`${
                path.split("/").pop() === location.pathname.split("/").pop()
                  ? "bg-[#4256D0]"
                  : "hover:bg-[#4256D0]"
              } mt-1 flex items-center gap-3 cursor-pointer text-white text-sm font-medium py-2 px-4 rounded-[10px]`}
            >
              {Icon && <Icon className="text-lg" />}
              <p className="capitalize tracking-wide">{titleBtn}</p>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
