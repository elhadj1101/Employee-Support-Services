import React, {useEffect} from "react";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import { loanColumns } from "components/employee/Columns/loanColumns";
import useStore from "store/index.js";
import {
  getLoans,
  canApplyForLoan,
} from "api/requests.js";
function ListLoans() {
  const { loans, updated, setUpdated, setCanApplyLoan , setLoans, setFetchedLoans} = useStore();
  const cols = loanColumns(["employee"]) || [];

  useEffect(()=>{
    async function fetchLoans() {
      const dat = await getLoans();
      const canApply = await canApplyForLoan();
      const cond = canApply === "True";
      setCanApplyLoan(cond);
      console.log("fetched loans again because of update");

      setLoans(dat);
      setFetchedLoans(true);
      setUpdated(false)
    }
    if (updated === "loans") {
      fetchLoans()
    }
  }, [])
  return (
    <div className="bg-gray-bg py-2 h-full">
      <div className=" mx-6 mb-4  text-2xl font-bold">
        Votre demandes de pret
      </div>
      <RequestsTable
        data={loans}
        filteredColumn="employee"
        columns={cols}
      />
    </div>
  );
}

export default ListLoans;
