import React from "react";
import Navbar from "../../Components/layout/Navbar";
import SearchIcon from "../../Components/icons/SearchIcon";
import TestTable from "../../Components/Admin/UsersTable/TestTable";

function Dashboard() {
  return (
    <>
      <Navbar path={"Utilisateurs"} />
      <div className="w-full h-screen    bg-lightgray">
        <div className="px-6 py-2">
          <h1 className="text-3xl text-black font-bold">
            Listes des utilisateurs
          </h1>

          {/* <div className="py-3">
            <form class="flex items-center max-w-full mx-auto">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5       "
                  placeholder="Search branch name..."
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300   "
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div> */}
          <TestTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
