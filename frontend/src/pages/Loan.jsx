import React from "react";
import Card from "components/Card";
import { useState } from "react";
import Popup from "components/Popup";
import useStore from "store/index.js";
import { Link } from "react-router-dom";
import { formatPrice } from "components/utils/utilFunctions";

const Loan = () => {
  const { user, canApplyLoan } = useStore();
  const intmaxPayMois = user && user.salary * 0.3;
  const maxPayMois = formatPrice(intmaxPayMois, ",");
  const maxLoan = formatPrice(intmaxPayMois * 12, ",");

  const [Montant, setMontant] = useState(intmaxPayMois);
  const [Duration, setDuration] = useState(12);
  const [MontantError, setMontantError] = useState("");
  const [DurationError, setDurationError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const montantRegex = /^\d{1,10}$/;
  const durationRegex = /^\d{1,2}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (value.trim) {
      val = parseInt(value.replace(/[^0-9]/g, ""));
    }
    if (name === "montant") {
      if (!montantRegex.test(val)) {
        setMontantError("Le montant est invalide.");
      } else if (val <= 0) {
        setMontantError("Le montant ne peut pas etre negatif ou nulle.");
        setMontant(1);
        return;
      } else if (val > intmaxPayMois) {
        setMontantError(
          "Le montant ne peut pas dépasser 30% de votre salaire. (" +
            maxPayMois +
            "DA)"
        );
        setMontant(intmaxPayMois);
        return;
      } else {
        setMontantError("");
      }
      setMontant(val);
    } else {
      if (val < 1 || val > 12) {
        setDurationError("La durée doit être entre 1 et 12 mois.");
        setDuration(12);
        return;
      } else {
        setDurationError("");
      }
      setDuration(val);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Montant === 0) {
      setMontantError("Veuillez entrer un montant de paiement par mois.");
    } else if (!montantRegex.test(Montant)) {
      setMontantError("Format invalide.(max 10 chiffres)");
    } else {
      setMontantError("");
    }
    if (Duration === 0) {
      setDurationError("Veuillez entrer une durée.");
    } else if (!durationRegex.test(Duration) || Duration > 12 || Duration < 1) {
      setDurationError("Format invalide.(max 2 chiffres et entre 1 et 12)");
    } else {
      setDurationError("");
    }
    if (Montant && Duration && !MontantError && !DurationError) {
      setShowModal(!showModal);
    }
  };
  return (
    <div className=" pt-2 bg-slate-50 h-[100vh]">
      <h1 className="font-semibold tet-2xl ml-6 text-2xl my-2">Demande Loan</h1>
      <div>
        <div className=" max-w-xs mx-auto sm:flex sm:justify-between sm:mx-6 sm:space-x-3 sm:max-w-full    ">
          <Card title="Montant max prét (12 mois)" price={maxLoan} />
          <Card title="Max paiment/mois (12 mois)" price={maxPayMois} />
          <Card title="éligible au prét?" isEligable={canApplyLoan} />
        </div>
        <div className=" sm:flex md:flex lg:flex mx-6 mb-6">
          <span className=" font-semibold">Remarque:</span>
          <p className=" text-md ml-2">
            Ces chiffres et informations basés sur votre salaire et le fonds de
            la communauté{" "}
          </p>
        </div>
      </div>
      {!canApplyLoan && (
        <div className="flex  items-start">
          <p className="text-red-800 mx-6 text-lg">
            Vous n'êtes pas éligible pour un prét pour le moment. Vous devez
            attendre que votre dernier prêt soit entièrement remboursé.
            <br />
            <span className="ml-0 underline hover:text-darkblue">
              <Link to="/liste-demandes-pret">Consulter votre demandes</Link>
            </span>
          </p>
        </div>
      )}
      {canApplyLoan && (
        <form className=" sm:px-7 h-auto bg-slate-50 mx-5 rounded-xl p-4">
          <span className="  sm:mt-8 font-medium text-xl flex mb-7 ">
            Nouvelle demande de prét
          </span>
          <label htmlFor="Montant" className=" sm:flex  sm:mt-7 sm:mb-1    ">
            Montant que vous voulez payer par mois (prix totale:{" "}
            {formatPrice(Montant * Duration, ",")}DA)
          </label>
          <input
            name="montant"
            className="  sm:flex   w-full   "
            value={Montant}
            type="number"
            onChange={handleChange}
            style={{ borderColor: MontantError ? "red" : "" }}
          />
          <p className="error font-light text-red-600 ">{MontantError}</p>

          <label htmlFor="durée" className=" sm:flex sm:mt-8  sm:mb-1  ">
            Durée de remboursement souhaitée (en mois [1-12])
          </label>
          <input
            className="  sm:flex  w-full   "
            name="duration"
            value={Duration}
            type="number"
            max={12}
            min={1}
            onChange={handleChange}
            style={{ borderColor: DurationError ? "red" : "" }}
          />
          <p className="error font-light text-red-600 ">{DurationError}</p>
          <button
            onClick={handleSubmit}
            className=" sm:mt-5  bg-blue-900 text-white w-36 py-2 rounded-lg"
          >
            Vérifier
          </button>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-75 shadow-2xl">
              <Popup handleClose={handleSubmit} />
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Loan;
