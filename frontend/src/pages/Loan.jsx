import React from "react";
import Dashboard from "./Dashboard";
import Sidebar from "components/layout/Sidebar";
import Navbar from "components/layout/Navbar";
import Card from "components/Card";
import { useState } from "react";

const Loan = () => {
  const [Montant, setMontant] = useState("");
  const [Duration, setDuration] = useState("");
  const [MontantError, setMontantError] = useState("");
  const [DurationError, setDurationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Montant.trim()) {
      setMontantError("This field is required.");
    } else if (!/^\d{1,10}$/.test(Montant)) {
      setMontantError("Invalid field format.");
    } else {
      setMontantError("");
    }
    if (!Duration.trim()) {
      setDurationError("This field is required.");
    } else if (!/^\d{1,2}$/.test(Duration)) {
      setDurationError("Invalid field format.");
    } else {
      setDurationError("");
    }
  };
  return (
    <div className=" pt-2 bg-slate-200 h-full">
      <h1 className="font-semibold tet-2xl ml-6 text-2xl my-2">Demande Loan</h1>
      <div className=" max-w-xs mx-auto sm:flex sm:justify-between sm:mx-6 sm:space-x-3 sm:max-w-full    ">
        <Card title="Montant max prét" price={5000} />
        <Card title="Max paiment/mois" price={500} />
        <Card title="éligible au prét?" isEligable={true} />
      </div>
      <div className=" sm:flex md:flex lg:flex m-6 mb-4">
        <span className=" font-semibold">Remarque:</span>
        <p className=" text-md ml-2">
          Ces chiffres et informations basés sur votre salaire et le fonds de la
          communauté{" "}
        </p>
      </div>

      <form className=" sm:px-7 h-auto bg-slate-50 mx-5 rounded-xl p-4">
        <span className="  sm:mt-8 font-medium    text-xl flex mb-7 ">
          Nouvelle demande de prét
        </span>
        <label htmlFor="Montant" className=" sm:flex  sm:mt-7 sm:mb-1    ">
          Montant demandé
        </label>
        <input
          className="  sm:flex   w-full   "
          value={Montant}
          type="number"
          onChange={(e) => setMontant(e.target.value)}
          style={{ borderColor: MontantError ? "red" : "" }}
        />
        <p className="error font-light text-red-600 ">{MontantError}</p>

        <label htmlFor="durée" className=" sm:flex sm:mt-8  sm:mb-1  ">
          Durée de remboursement souhaitée
        </label>
        <input
          className="  sm:flex  w-full   "
          value={Duration}
          type="number"
          onChange={(e) => setDuration(e.target.value)}
          style={{ borderColor: DurationError ? "red" : "" }}
        />
        <p className="error font-light text-red-600 ">{DurationError}</p>
        <button
          onClick={handleSubmit}
          className=" sm:mt-5  bg-blue-900 text-white w-36 py-2 rounded-lg"
        >
          Vérifier
        </button>
      </form>
    </div>
  );
};

export default Loan;
