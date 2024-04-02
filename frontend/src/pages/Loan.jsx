import React, { useEffect } from "react";
import Card from "components/Card";
import { useState } from "react";
import Popup from "components/Popup";
import useStore from "store/index.js";
import { Link } from "react-router-dom";
import { formatPrice } from "components/utils/utilFunctions";
import { toast } from "sonner";
import Axios from "api/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
const Loan = () => {
  const { user, loans, canApplyLoan, setUpdated } = useStore();

  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  let loanDraftId = parts[parts.length - 1];
  loanDraftId = loanDraftId === "demande-pret" ? false : parseInt(loanDraftId);
  let crrntLoan =
    loanDraftId && loans && loans.filter((loan) => loan.id === loanDraftId)[0];
  const intmaxPayMois = user && user.salary * 0.3;
  const maxPayMois = formatPrice(intmaxPayMois, ",");
  const maxLoan = formatPrice(intmaxPayMois * 12, ",");
  const [Montant, setMontant] = useState(intmaxPayMois);
  const [Duration, setDuration] = useState(12);
  const [motif, setMotif] = useState("");
  const [payment_method, setPayment_method] = useState("ccp");

  const [motifError, setMotifError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [MontantError, setMontantError] = useState("");
  const [DurationError, setDurationError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const durationRegex = /^\d{1,2}$/;

  useEffect(() => {
    crrntLoan =
      loanDraftId &&
      loans &&
      loans.filter((loan) => loan.id === loanDraftId)[0];
    crrntLoan =
      crrntLoan && crrntLoan.loan_status === "draft" ? crrntLoan : null;
    let oldF = crrntLoan
      ? crrntLoan.documents.map((doc) => {
          return {
            name: doc.document_name,
            url: doc.document_file,
            size: doc.document_size * 1000,
          };
        })
      : [];
    setOldFiles(oldF);
    setMontant(!crrntLoan ? intmaxPayMois : crrntLoan?.loan_amount);
    setDuration(!crrntLoan ? 12 : crrntLoan?.loan_period);
    setMotif(!crrntLoan ? "" : crrntLoan?.loan_motivation);
    setPayment_method(!crrntLoan ? "ccp" : crrntLoan?.payment_method);
  }, [crrntLoan]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (value.trim && name !== "payment_method") {
      val = parseFloat(value.replace(/[^0-9]/g, ""));
    }
    if (name === "montant") {
      if (val <= 0) {
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
    } else if (name === "duration") {
      if (val < 1 || val > 12) {
        setDurationError("La durée doit être entre 1 et 12 mois.");
        setDuration(12);
        return;
      } else {
        setDurationError("");
      }
      setDuration(val);
    } else {
      setPayment_method(val);
    }
  };
  const handleSelectChange = (value) => {
    setPayment_method(value);
  };

  const handleShowPopup = (e) => {
    e.preventDefault();
    if (Montant === 0) {
      setMontantError("Veuillez entrer un montant de paiement par mois.");
      return;
    } else {
      setMontantError("");
    }
    if (Duration === 0) {
      setDurationError("Veuillez entrer une durée.");
      return;
    } else if (!durationRegex.test(Duration) || Duration > 12 || Duration < 1) {
      setDurationError("Format invalide.(max 2 chiffres et entre 1 et 12)");
      return;
    } else {
      setDurationError("");
    }
    if (Montant && Duration) {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    let isDraft = "false";
    if (name === "draft") isDraft = "true";
    if (motif === "") {
      setMotifError("Le motif est requis.");
      return;
    }
    const endpoint =
      !crrntLoan || loanDraftId == false
        ? "/requests/loans/?draft="
        : `/requests/loans/${loanDraftId}?draft=`;
    const formData = new FormData();
    formData.append("loan_amount", parseFloat(Montant));
    formData.append("loan_period", Duration);
    formData.append("loan_motivation", motif);
    formData.append("payment_method", payment_method);
    uploadedFiles.forEach((file) => {
      formData.append("files[]", file);
    });
    oldFiles.forEach((of) => {
      formData.append("old_files", of.url.replace("/documents/", ""));
    });
    if (!crrntLoan || loanDraftId == false) {
      Axios.post(endpoint + isDraft, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          toast.success("La demande a été envoyée avec succès");
          setUpdated("loans");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data?.detail) {
              toast.error(err.response.data.detail);
            } else if (err.response.data?.error) {
              toast.error(err.response.data.error);
            } else if (err.response.data) {
              toast.error(
                Object.keys(err.response.data)[0] +
                  ": " +
                  err.response.data[Object.keys(err.response.data)[0]]
              );
            }
          } else {
            toast.error(
              "Une erreur s'est produite lors de l'envoi de la demande"
            );
          }
        });
    } else {
      Axios.patch(endpoint + isDraft, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          toast.success("La demande a été envoyée avec succès");
          setUpdated("loans");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data?.detail) {
              toast.error(err.response.data.detail);
            } else if (err.response.data?.error) {
              toast.error(err.response.data.error);
            } else if (err.response.data) {
              toast.error(
                Object.keys(err.response.data)[0] +
                  ": " +
                  err.response.data[Object.keys(err.response.data)[0]]
              );
            }
          } else {
            toast.error(
              "Une erreur s'est produite lors de l'envoi de la demande"
            );
          }
        });
    }

    setShowModal(false);
  };
  return (
    <div className=" pt-2 bg-lightgray h-[100vh]">
      <h1 className="font-semibold tet-2xl ml-6 text-2xl my-2">
        {loanDraftId === false
          ? "Demande De Pret"
          : "Modification d'un brouillon (N°:" + loanDraftId + ")"}
      </h1>
      <div>
        <div className=" max-w-xs mx-auto sm:flex sm:justify-between sm:mx-6 sm:space-x-3 sm:max-w-full    ">
          <Card
            title="Montant max prét (12 mois)"
            price={maxLoan}
            icon="/icons/loan.png"
          />
          <Card
            title="Max paiment/mois (12 mois)"
            price={maxPayMois}
            icon="/icons/timeloan.png"
          />
          <Card
            title="éligible au prét?"
            isEligable={canApplyLoan}
            icon="/icons/eligable.png"
          />
        </div>
        <div className=" sm:flex md:flex lg:flex mx-6 mb-6">
          <span className=" font-semibold">Remarque:</span>
          <p className=" text-md ml-2">
            Ces chiffres et informations basés sur votre salaire et le fonds de
            la commité{" "}
          </p>
        </div>
      </div>
      {!canApplyLoan && !crrntLoan && (
       <div
       className=" mx-5 w-fit   flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-[#fbd0d0] dark:bg-gray-800 dark:text-red-400"
       role="alert"
     >
       <svg
         className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px] "
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         viewBox="0 0 20 20"
       >
         <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
       </svg>
       <span className="sr-only">Danger</span>
       <div>
         <span className="font-medium block mb-1">
         Vous n'êtes pas éligible pour un prét pour le moment. Vous devez
       attendre que votre dernier prêt soit entièrement remboursé.
         </span>
         <Link to="/liste-demandes-pret" className="underline font-semibold">Consulter votre demandes</Link>

         
       </div>
     </div>
      )}

      {((canApplyLoan && !loanDraftId) ||
        (crrntLoan && loanDraftId && crrntLoan.loan_status === "draft")) && (
        <form className=" sm:px-7 h-auto bg-white mx-5 rounded-xl p-4">
          <span className="  sm:mt-8 font-medium text-xl flex mb-7 ">
            {loanDraftId === false
              ? "Nouvelle demande de prét"
              : "Modification d'un brouillon (N°:" + loanDraftId + ")"}
          </span>
          <label htmlFor="Montant" className=" sm:flex  sm:mt-7 sm:mb-2    ">
            Montant que vous voulez payer par mois (prix totale:{" "}
            {formatPrice(Montant * Duration, ",")}DA)
          </label>
          <input
            name="montant"
            className="   w-full   "
            value={Montant}
            type="number"
            onChange={handleChange}
            step="any"
            style={{ borderColor: MontantError ? "red" : "" }}
          />
          <p className="error font-light text-red-600 mb-2">{MontantError}</p>
          <div className="flex gap-2">
            <div className="basis-1/2">
              <label htmlFor="durée" className="  sm:mt-8    ">
                Durée de remboursement souhaitée (en mois [1-12])
              </label>
              <input
                className="  w-full  mt-2 "
                name="duration"
                value={Duration}
                type="number"
                max={12}
                min={1}
                onChange={handleChange}
                style={{ borderColor: DurationError ? "red" : "" }}
              />
            </div>
            <div className="basis-1/2">
              <label htmlFor="payment_method" className="  sm:mt-8    ">
                De quelle manière voulez-vous payer?
              </label>
              <Select
                name="payment_method"
                value={payment_method}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-full h-auto p-3 mt-2 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ccp">CCP</SelectItem>
                  <SelectItem value="banque">Virement Banquaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="error font-light text-red-600 mb-2">{DurationError}</p>
          <button
            onClick={handleShowPopup}
            className=" sm:mt-5  bg-light-blue text-white w-36 py-2 rounded-lg"
          >
            Vérifier
          </button>
          {showModal && (
            <div className="absolute min-h-full h-max inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-75 shadow-2xl">
              <Popup
                handleClose={handleClose}
                oldFiles={oldFiles}
                setOldFiles={setOldFiles}
                motif={motif}
                motifError={motifError}
                setMotifError={setMotifError}
                setMotif={setMotif}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </form>
      )}

      {((!crrntLoan && loanDraftId) ||
        (crrntLoan && crrntLoan.loan_status !== "draft")) && (
        <div className="flex  items-start">
          <p className="text-red-800 mx-6 text-lg">
            Vous n'avez aucun brouillon de demande de prêt avec le numéro:{" "}
            {loanDraftId}
            <br />
            <span className="ml-0 underline hover:text-darkblue">
              <Link to="/liste-demandes-pret">Consulter votre demandes</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Loan;
