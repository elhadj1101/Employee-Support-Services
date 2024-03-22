import React, { useEffect, useState, useRef } from "react";

function FileInput({
  labell = "Choisir un fichier",
  uploadInputElRef = null,
  accepts = "pdf",
  fileTypes = ["PDF"],
}) {
  const uploadInputEltest = useRef(null);
  const [crrntFile, setCrrntFile] = useState(null);
  if (!uploadInputElRef || typeof uploadInputElRef !== "object") {
    uploadInputElRef = uploadInputEltest;
  }

  const handleFiles = () => {
    if (uploadInputElRef.current) {
      const { files } = uploadInputElRef.current;
      setCrrntFile(files[0]);
    }
  };

  useEffect(() => {
    if (uploadInputElRef.current) {
      uploadInputElRef.current.addEventListener("change", handleFiles, false);
    }
    return () => {
      uploadInputElRef.current &&
        uploadInputElRef.current.removeEventListener(
          "change",
          handleFiles,
          false
        );
    };
  }, [uploadInputElRef]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="upload" className="mb-2">
        {labell}
        <span style={{ color: "red" }}> * </span>
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full mx-auto h-56 border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-20 h-20 mb-4 text-darkblue"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-gray-600">
              {crrntFile
                ? `Le fichier choisi: ${crrntFile.name}`
                : "Aucun fichier choisi"}
            </p>
            <p className="mb-2 text-md  text-gray-500">
              <span className="font-semibold">Clicker ici</span> ou faire
              Glissez et déposez les fichiers ici
            </p>
            <p className="text-xs text-gray-500">
              les fichiers supporter sont: {fileTypes.join(", ")}
            </p>
          </div>
          <input
            id="dropzone-file"
            ref={uploadInputElRef}
            accept={accepts}
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

export default FileInput;
