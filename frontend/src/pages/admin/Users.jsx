import TestTable from "components/Admin/UsersTable/TestTable";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Users() {
  return (
    <div className="w-full flex-grow flex flex-col  bg-lightgray">
      <div className="px-6 py-4 flex flex-col flex-grow ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl text-black font-bold">
            Listes des utilisateurs
          </h1>
          <Link
            onClick={() => {
              toast.success("Event has been created");
            }}
            to={"../utilisateurs/add-user"}
            className=" bg-light-blue flex items-center justify-center  gap-2 rounded-lg   px-5 py-2 text-base  lg:px-10 lg:py-3 lg:text-lg text-white  "
          >
            <p className="capitalize">Ajouter un utilisateur</p>
            <img
              src="/icons/plus.svg"
              alt="plus-icon"
              className="mt-[1px] lg:mt-1"
            />
          </Link>
        </div>
        <TestTable />
      </div>
    </div>
  );
}
