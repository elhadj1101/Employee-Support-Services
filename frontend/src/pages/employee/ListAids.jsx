import React from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";

function ListAids() {
  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Votre demandes d'aide financiere
      </div>
      <RequestsTable type="aids"/>
    </div>
  );
}

export default ListAids;
