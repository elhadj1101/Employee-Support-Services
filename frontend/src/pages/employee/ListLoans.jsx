import React from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import { loanColumns } from "components/employee/Columns/loanColumns";
import useStore from "store/index.js";

function ListLoans() {
  const { loans } = useStore();

  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Votre demandes de pret
      </div>
      <RequestsTable data={loans} columns={loanColumns} />
    </div>
  );
}

export default ListLoans;
