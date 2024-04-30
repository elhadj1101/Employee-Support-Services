import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";
import { TbCopy } from "react-icons/tb";

import { toast } from "sonner";

export default function UserCard({ user }) {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copié dans le presse-papiers"))
      .catch((error) => toast.error("Échec de la copie"));
  };

  const roleColors = {
    employe: "text-green-900 bg-green-100",
    president: "text-blue-900 bg-blue-100",
    tresorier: "text-yellow-900 bg-yellow-100",
    vice_president: "text-purple-900 bg-purple-100",
    membre_commute: "text-red-900 bg-red-100",
    admin: "text-gray-900 bg-gray-100",
  };
  return (
    <div className=" shadoww lg:max-w-[35%] xl:max-w-[30%] w-full  h-fit bg-white p-4 rounded-lg ">
      <div className="flex  justify-between items-center">
        <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
          employé details
        </h1>
        <Link href="#" className="underline font-semibold pb-2 cursor-pointer">
          Tout Les Demmandes
        </Link>
      </div>
      <div className="my-2 flex justify-between items-center">
        <h3 className="font-bold capitalize text-gray-600 text-lg ">
          {user?.last_name + " " + user?.first_name}
        </h3>
        <div
          className={
            "capitalize w-fit h-fit py-1 px-3  rounded-3xl " +
            roleColors[user?.role || "employe"]
          }
        >
          {user && user?.role?.replace("_", " ")}
        </div>
      </div>

      <div className="my-2">
        <h3 className="font-bold capitalize text-gray-600  mb-1">
          Contact info
        </h3>
        <ul className=" pl-2">
          <li className=" text-red-500  flex items-center gap-2">
            {" "}
            <MdOutlinePhoneInTalk />
            <p> {user?.phone_number}</p>
          </li>
          <li className="  text-red-500  hover:text-red-700 cursor-pointer underline-offset-3 underline p-1 w-fit">
            <a
              href={`mailto:${user?.email}`}
              className=" flex items-center gap-2"
            >
              <MdOutlineMail />
              <p> {user?.email}</p>
            </a>
          </li>
        </ul>
      </div>
      <div className="my-2">
        <h3 className="font-bold capitalize text-gray-600 ">Adress</h3>
        <p className="pl-2  text-gray-500">{user?.birth_adress}</p>
      </div>
      <div className="my-2">
        <h3 className="font-bold capitalize text-gray-600 ">CCP rip</h3>

        <p className="pl-2 pb-4 text-gray-500 flex items-center gap-5">
          <p className="h-7 text-gray-500">
            {" "}
            <span className="pr-2"> 00799999</span>
            {user?.rip?.replace("00799999", "").slice(0, -2)}
            {"   "}
            <span className="" style={{ display: "inline-block" }}>
              {" "}
              clé {user?.rip?.slice(-2)}
            </span>
          </p>{" "}
          <TbCopy
            className="cursor-pointer  w-5 h-5 hover:text-green-600"
            onClick={() => {
              copyToClipboard(user?.rip);
            }}
          />
        </p>
      </div>
      <div className="my-2">
        <h3 className="font-bold capitalize text-gray-600 ">Banque RIB</h3>
        <p className="pl-2 pb-4 text-gray-500 flex items-center gap-5">
          <p className="h-7">{user?.bank_rib?.match(/.{1,4}/g)?.join(" ")}</p>
          <TbCopy
            className="cursor-pointer w-5 h-5 hover:text-green-600"
            onClick={() => {
              copyToClipboard(user?.bank_rib);
            }}
          />
        </p>
      </div>
    </div>
  );
}
