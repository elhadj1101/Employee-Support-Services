import React, { useEffect } from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import { aidsColumns } from "components/employee/Columns/aidsColumns";
import useStore from "store/index.js";
import { getAids } from "api/requests";

function ListAids() {
  const { aids, updated, setUpdated, setAids, setFetchedAids } = useStore();
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
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Votre demandes d'aide financiere
      </div>
      <RequestsTable
        data={aids}
        columns={aidsColumns}
        filteredColumn="employee"
      />
    </div>
  );
}

export default ListAids;
