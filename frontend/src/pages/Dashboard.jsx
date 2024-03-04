import React from "react";
import Navbar from "../Components/layout/Navbar";
import SearchIcon from "../Components/icons/SearchIcon";

function Dashboard() {
  return (
    <div className="w-full h-screen    bg-lightgray">
      <Navbar />
      <div className="px-6 py-2">
        <h1 className="text-3xl text-black font-bold">
          Listes des utilisateurs
        </h1>
        <div className="py-3">
          <form className="max-w-full" onSubmit={()=>{console.log('test')}}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon classNames="w-4 h-4 text-gray-500 " />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 "
                placeholder="Vous cherchez quel utilisateur ..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 "
              >Recherche
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
