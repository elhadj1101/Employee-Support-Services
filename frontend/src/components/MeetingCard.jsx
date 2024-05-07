import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowDown ,MdDelete ,MdOutlineEditCalendar , MdCheck , MdAddBox  } from "react-icons/md";

export default function MeetingCard() {
    const [open , setOpen] = useState(false)
  return (
    <div className="shadoww bg-white rounded-md m-3 my-1 p-4 transition-all duration-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h2 className="capitalize font-bold text-xl">
            reunions title here or objective
          </h2>
       
        </div>
        <div className="flex items-center gap-2">
          <MdCheck  color="green"  size={20} className="cursor-pointer"/>
          <MdOutlineEditCalendar  color="gray"  size={20} className="cursor-pointer"/>
          <MdAddBox   color="orange"  size={20} className="cursor-pointer"/>
          <MdDelete color="red"  size={20} className="cursor-pointer"/>
        </div>
      </div>
      <div className="flex items-center gap-1  ml-2 text-sm text-gray-500 ">
        <p className="mr-1">2024-10-23</p>
        <p className="mr-1"> 10:00Am To 11:30Am </p>
        <p className="text-green-500 text-sm capitalize font-semibold flex items-center">
          <div className="w-[6px] h-[6px] bg-green-500 rounded-full mr-[2px]" />
          online
        </p>
        <p className="text-red-500 text-sm capitalize font-semibold flex items-center">
            <div className="w-[6px] h-[6px] bg-red-500 rounded-full mr-[2px]" />{" "}
            Presentiel
          </p>
      </div>
      <p className="ml-2 text-sm text-gray-500 flex items-center gap-1">
        <p>Lien:</p>
        <span className="text-black"> google.com/lei43s</span>
        <FaExternalLinkAlt className="cursor-pointer " size={12} />
      </p>
      <button onClick={()=>setOpen(!open)} className="ml-auto w-fit flex items-center gap-1 text-gray-400 hover:text-gray-500 ">voir plus <MdOutlineKeyboardDoubleArrowDown className={`${open ?'':'-rotate-90'}`}/> </button>
    {open && <div className="transition-all mt-2">
        <p>Notes</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum et ipsam vero ab ullam, eos rem distinctio nesciunt in repellendus, voluptatum optio, quidem cupiditate ipsa eius! Eveniet vitae perferendis fugiat.</p>
        <p>Pv</p>
        file
        </div>}
    </div>
  );
}
