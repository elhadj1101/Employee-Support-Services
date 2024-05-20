import React, { useEffect } from "react";
import RequestsTable from "components/employee/requestsTable/RequestsTable";
import { aidsColumns } from "components/employee/Columns/aidsColumns";
import useStore from "store/index.js";
import { getAids } from "api/requests";

function ListAids() {
  const { aids, updated, setUpdated, setAids, setFetchedAids } = useStore();
  const cols = aidsColumns(["employee"]) || [];
  useEffect(() => {
    async function fetchAids() {
      const dat = await getAids();
      console.log("fetched Aids again because of update");
      setUpdated(false);
      setAids(dat);
      setFetchedAids(true);
    }
    if (updated === "aids") {
      fetchAids();
    }
  }, []);
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Votre demandes d'aide financiere
        </h1>
      </div>
      <div className="relative w-full bg-white p-4 pt-0 lg:p-6 rounded-lg ">
        <RequestsTable data={aids} columns={cols} filteredColumn="id" />
      </div>
    </div>
  );
}

export default ListAids;
