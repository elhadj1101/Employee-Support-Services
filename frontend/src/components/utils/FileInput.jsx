import React, { useEffect, useState, useRef } from "react";

function FileInput({
  labell = "",
  uploadInputElRef = null,
  accepts = "pdf",
  fileTypes = ["PDF"],
  iconW = "w-20",
  iconH = "h-20",
  iconClass= "",
  multpl = false,
}) {
  const uploadInputEltest = useRef(null);
  const [crrntFiles, setCrrntFiles] = useState(null);
  if (!uploadInputElRef || typeof uploadInputElRef !== "object") {
    uploadInputElRef = uploadInputEltest;
  }

  const handleFiles = () => {
    if (uploadInputElRef.current) {
      const { files } = uploadInputElRef.current;
      setCrrntFiles(files);
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
      {labell !== "" && (
        <label htmlFor="upload" className="">
          {labell}
          <span style={{ color: "red" }}> * </span>
        </label>
      )}
      <div className="mt-2 flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex  flex-col items-center justify-center w-full mx-auto h-56 border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center w-full border-dashed border-light-blue py-8 border-2 justify-center p-5 ">
            <svg
              className={iconH + " " + iconW + " mb-4 text-light-blue "+ iconClass }
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
              {crrntFiles
                ? multpl
                  ? `Les fichiers choisi: ${Array.from(crrntFiles).reduce(
                      (prv, crrn) => prv + crrn.name + ", ",
                      ""
                    )}`
                  : "Le fichier choisi: " + crrntFiles[0].name
                : "Aucun fichier choisi"}
            </p>
            <p className="mb-2 text-md  text-gray-500">
              <span className="font-semibold">Clicker ici</span> ou faire
              Glissez et déposez les fichiers ici
            </p>
            <p className="text-xs text-gray-500">
              les fichiers supporter sont: {fileTypes}
            </p>
          </div>
          {multpl ? (
            <input
              id="dropzone-file"
              ref={uploadInputElRef}
              accept={accepts}
              type="file"
              className="hidden"
              multiple
            />
          ) : (
            <input
              id="dropzone-file"
              ref={uploadInputElRef}
              accept={accepts}
              type="file"
              className="hidden"
            />
          )}
        </label>
      </div>
    </div>
  );
}

export default FileInput;
