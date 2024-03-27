import React from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import useStore from "store/index.js";
import { aidsColumns } from "components/employee/Columns/aidsColumns";
import { loanColumns } from "components/employee/Columns/loanColumns";

function EmployeesRequests() {
  const { allAids, allLoans } = useStore();
  const loancols = loanColumns(["id"]) || [];

  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Les demandes d'aide financiere
      </div>
      <RequestsTable data={allAids} columns={aidsColumns} />

      <div className=" mx-6 mb-4  text-2xl font-bold">
        Les demandes de prets
      </div>
      <RequestsTable data={allLoans} columns={loancols}  filteredColumn="employee"/>
    </div>
  );
}

export default EmployeesRequests;
