import React from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import { aidsColumns } from "components/employee/Columns/aidsColumns";
import useStore from "store/index.js";

function ListAids() {
  const { aids } = useStore();

  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Votre demandes d'aide financiere
      </div>
      <RequestsTable data={aids} columns={aidsColumns} filteredColumn="employee"/>
    </div>
  );
}

export default ListAids;
