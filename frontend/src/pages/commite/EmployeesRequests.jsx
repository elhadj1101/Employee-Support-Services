import React from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import useStore from "store/index.js";
import { aidsColumns } from "components/employee/Columns/aidsColumns";
import { loanColumns } from "components/employee/Columns/loanColumns";
import { getAllAids, getAllLoans } from "api/requests.js"; 
function EmployeesRequests() {
  const {
    allAids,
    allLoans,
    updated,
    setAllAids,
    setFetchedAllAids,
    setAllLoans,
    setUpdated,
    setFetchedAllLoans,
  } = useStore();
  const loancols = loanColumns([], true) || [];
  const aidscols = aidsColumns([], true) || [];
  React.useEffect(() => {
    async function fetchAllAids() {
      const dat = await getAllAids();

      setAllAids(dat);
      setUpdated(false);

      setFetchedAllAids(true);
    }
    async function fetchAllLoans() {
      const dat = await getAllLoans();
      setAllLoans(dat);
      setUpdated(false);

      setFetchedAllLoans(true);
    }
    if (updated === "aids") {
      fetchAllAids();
    }else if (updated === "loans") {
      fetchAllLoans();
    }
  }, []);
  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Les demandes d'aide financiere
      </div>
      <RequestsTable data={allAids} columns={aidscols} filteredColumn="employee" />

      <div className=" mx-6 mb-4  text-2xl font-bold">
        Les demandes de prets
      </div>
      <RequestsTable
        data={allLoans}
        columns={loancols}
        filteredColumn="employee"
      />
    </div>
  );
}

export default EmployeesRequests;
