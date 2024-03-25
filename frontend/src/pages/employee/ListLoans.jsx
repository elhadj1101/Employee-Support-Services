import React from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";

function ListLoans() {
  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Votre demandes de pret
      </div>
      <RequestsTable />
    </div>
  );
}

export default ListLoans;
