import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdDelete,
  MdCheck,
} from "react-icons/md";

export default function MeetingCard({ meeting }) {
  const [open, setOpen] = useState(false);
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div
      className={`  shadoww bg-white rounded-[30px] m-4 my-3 p-4 transition-all duration-500`}
    >
      <div className="flex  h-full items-center ">
        <div className="mr-10 flex flex-col items-center ">
          {meeting?.link && (
            <div
              className={`w-24 ${
                open ? " py-24 " : "h-20"
              } transition-all duration-500 bg-light-blue rounded-2xl p-2 text-white font-bold text-2xl flex items-center justify-center`}
            >
              {meeting?.day.split("-")[2]}{" "}
              {MONTHS[Number(meeting?.day.split("-")[1])]}
            </div>
          )}
          {!meeting?.link && (
            <div
              className={`w-24 ${
                open ? " py-24 " : "h-20"
              } transition-all duration-500 bg-green-500 rounded-2xl p-2 text-white font-bold text-2xl flex items-center justify-center`}
            >
              {meeting?.day.split("-")[2]}
              {MONTHS[Number(meeting?.day.split("-")[1])]}
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <h2 className="capitalize font-bold text-xl">{meeting?.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <MdCheck
                size={20}
                className="cursor-pointer text-green-500 hover:text-white  hover:bg-green-600 w-6 h-6 rounded-full"
              />

              <MdDelete
                size={20}
                className="cursor-pointer text-red-500 hover:text-white  hover:bg-red-600 w-6 h-6 rounded-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-1  ml-2 text-sm text-gray-500 ">
            <p className="mr-1">{meeting?.day}</p>
            <p className="mr-1">
              {meeting?.start_time.split(":").slice(0, 2).join(":")} To{" "}
              {meeting?.end_time.split(":").slice(0, 2).join(":")}
            </p>
            {!meeting?.link && (
              <p className="text-green-500 text-sm capitalize font-semibold flex items-center">
                <div className="w-[6px] h-[6px] bg-green-500 rounded-full mr-[2px]" />
                online
              </p>
            )}
            {meeting?.link && (
              <p className="text-light-blue text-sm capitalize font-semibold flex items-center">
                <div className="w-[6px] h-[6px] bg-light-blue rounded-full mr-[2px]" />{" "}
                Presentiel
              </p>
            )}
          </div>
          <p className="ml-2 text-sm text-gray-500 flex items-center gap-1">
            {!meeting?.link && (
              <>
                <p className="capitalize text-gray-700 font-bold  ">Lien:</p>
                <span className="text-black"> {meeting?.link}</span>
                <a href={meeting?.link}>
                  <FaExternalLinkAlt className="cursor-pointer " size={12} />
                </a>
              </>
            )}
          </p>
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto w-fit flex items-center gap-1 text-gray-400 hover:text-gray-500 "
          >
            voir plus{" "}
            <MdOutlineKeyboardDoubleArrowDown
              className={`${open ? "" : "-rotate-90"}`}
            />
          </button>
          {open && (
            <div className="transition-all mt-2 ">
              <p className="capitalize text-gray-700 font-bold pl-2 ">
                description
              </p>
              <p className="py-1 pl-4">{meeting?.description}</p>
              <p className="capitalize text-gray-700 font-bold pl-2">Pv</p>
              {meeting?.pv ? (
                meeting?.pv
              ) : (
                <p className="text-center py-3 text-gray-500">
                  aucun PV associé pour le moment.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
