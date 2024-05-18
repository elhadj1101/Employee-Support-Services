import React from "react";
import RequestsTable from "components/employee/requestsTable/RequestsTable";
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
    user
  } = useStore();
  const loancols = loanColumns([], true, user.role) || [];
  const aidscols = aidsColumns([], true, user.role) || [];
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
    } else if (updated === "loans") {
      fetchAllLoans();
    }
  }, []);
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Les demandes d'aide financiere
        </h1>
      </div>
      <div className="relative w-full bg-white p-4 pt-0 lg:p-6 rounded-lg ">
        <RequestsTable
          data={
            user.role === "tresorier"
              ? allAids.filter((aid) => aid.financial_aid_status === "approved")
              : allAids
          }
          columns={aidscols}
          filteredColumn="employee"
        />
      </div>
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Les demandes de prets
        </h1>
      </div>
      <div className="relative w-full bg-white p-4 pt-0 lg:p-6 rounded-lg ">
        <RequestsTable
          data={
            user.role === "tresorier"
              ? allLoans.filter(
                  (loan) =>
                    loan.loan_status === "approved" ||
                    loan.loan_status === "payment_started"
                )
              : allLoans
          }
          columns={loancols}
          filteredColumn="employee"
        />
      </div>
    </div>
  );
}

export default EmployeesRequests;
