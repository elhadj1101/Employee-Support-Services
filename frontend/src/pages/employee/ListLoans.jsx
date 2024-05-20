import React, { useEffect } from "react";
import RequestsTable from "components/employee/requestsTable/RequestsTable";
import { loanColumns } from "components/employee/Columns/loanColumns";
import useStore from "store/index.js";
import { getLoans, canApplyForLoan } from "api/requests.js";
function ListLoans() {
  const {
    loans,
    updated,
    setUpdated,
    setCanApplyLoan,
    setLoans,
    setFetchedLoans,
  } = useStore();
  const cols = loanColumns(["employee"]) || [];

  useEffect(() => {
    async function fetchLoans() {
      const dat = await getLoans();
      const canApply = await canApplyForLoan();
      const cond = canApply === "True";
      setCanApplyLoan(cond);
      console.log("fetched loans again because of update");

      setLoans(dat);
      setFetchedLoans(true);
      setUpdated(false);
    }
    if (updated === "loans") {
      fetchLoans();
    }
  }, []);
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Votre demandes de pret
        </h1>
      </div>
      <div className="relative w-full bg-white p-4 pt-0 lg:p-6 rounded-lg">
        <RequestsTable data={loans} filteredColumn="id" columns={cols} />
      </div>
    </div>
  );
}

export default ListLoans;
