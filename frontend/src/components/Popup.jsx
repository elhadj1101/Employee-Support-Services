import React, { useRef } from "react";
import FileInput from "./utils/FileInput";
const Popup = ({
  handleClose = () => {},
  motif = "",
  setMotifError = () => {},
  setMotif = () => {},
  motifError = "",
  uploadedFiles = [],
  setUploadedFiles = () => {},
  handleSubmit = () => {},
}) => {
  const filesRef = useRef(null);
  const handleChange = (e) => {
    setMotif(e.target.value);
    if (e.target.value !== "") {
      setMotifError("");
    } else {
      setMotifError("Le motif est requis.");
    }
  };
  return (
    <div className="justify-center items-center flex h-full">
      <div className=" bg-white h-auto sm:w-[800px] w-full border-blue-900 border  rounded-lg my-4   ">
        <h1 className=" p-5 font-medium">Completer la demande</h1>
        <div className=" ml-5">
          <label className=" mb-3 flex" htmlFor="Motif">
            Motif
          </label>
          <textarea
            className=" sm:flex sm:w-[97%] w-[94%]   h-20 border border-gray-300 p-1 rounded-md text-md    "
            type="text"
            value={motif}
            onChange={handleChange}
            placeholder="Décriver pourquoi vous voulez un prét"
            style={{ borderColor: motifError ? "red" : "" }}
          />
          <p className="error font-light text-red-600 ">{motifError}</p>
          <div >
            <h1 >Remarque:</h1>
          <p className=" bg-slate-50 w-fit rounded-sm text-blue-800">Vous pouvez déposer les documents justificatifs nécessaires à l'appui de votre demande de prêt.</p>
          </div>
          
        </div>
        <div className="w-full p-4 ">
          <FileInput
            uploadInputElRef={filesRef}
            files={uploadedFiles}
            setFiles={setUploadedFiles}
            maxFiles={5}
            accepts="application/pdf"
            fileTypes="PDF"
            multpl={true}
          />
        </div>
        <div className="  space-x-3 ml-5 mb-5  ">
          <button
            name="not-draft"
            className=" bg-blue-900 text-slate-50 py-3 px-6 rounded-md "
            onClick={handleSubmit}
          >
            Envoyer la demande
          </button>
          <button
            name="draft"
            className=" bg-blue-900 text-slate-50 py-3 px-6 rounded-md "
            onClick={handleSubmit}
          >
            Sauvegarder comme brouillon
          </button>
          <button
            onClick={handleClose}
            className=" bg-slate-50 text-slate-950 py-3 px-7 rounded-md border-solid border-black border-2 "
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
