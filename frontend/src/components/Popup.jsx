import React, { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import FileInput from "./utils/FileInput";
const Popup = ({ handleClose }) => {
  const [motif, setMotif] = useState("");
  const [motifError, setMotifError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const filesRef = useRef(null);

  return (
    <div className="  justify-center items-center flex">
      <div className="     h-auto sm:w-[800px] w-full  bg-slate-100 rounded-lg my-4   ">
        <h1 className=" p-5 font-medium">Completer la demande</h1>
        <form className=" ml-5">
          <label className=" mb-3 flex" htmlFor="Motif">
            Motif
          </label>
          <input
            className=" sm:flex sm:w-[97%] w-[94%]   h-20   "
            type="text"
            placeholder="Décriver pourquoi vous voulez un prét"
            style={{ borderColor: motifError ? "red" : "" }}
          />
        </form>
        {/* <FileUpload /> */}
        <div className="w-full p-4 ">
          <FileInput
            uploadInputElRef={filesRef}
            files={uploadedFiles}
            setFiles={setUploadedFiles}
            accepts="application/pdf"
            fileTypes="PDF"
            multpl={true}
          />
        </div>
        <div className="  space-x-3 ml-5 mb-5  ">
          <button className=" bg-indigo-800 text-slate-50 py-3 px-6 rounded-md ">
            Demander
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
