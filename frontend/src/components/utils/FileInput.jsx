import { max } from "date-fns";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";

function FileInput({
  labell = "",
  uploadInputElRef = null,
  files = null,
  maxFiles = -1,
  setFiles = null,
  accepts = "application/pdf",
  fileTypes = "PDF",

  multpl = false,
}) {
  const uploadInputEltest = useRef(null);
  const [testfiles, settestFiles] = useState([]);
  if (files === null || setFiles === null) {
    [files, setFiles] = [testfiles, settestFiles];
  }
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragActive(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (maxFiles !== -1 && files.length + droppedFiles.length > maxFiles) {
        toast.warning(
          `Vous ne pouvez pas ajouter plus de ${maxFiles} fichiers`
        );
        return;
      }
      const acceptedFiles = droppedFiles.filter((file) => {
        const ext = file.name.split(".").pop();
        const accpted = fileTypes.includes(ext.toUpperCase());
        if (!accpted) {
          toast.warning(
            `le fichier ${file.name} n'est pas accepté car l'extemsion n'est pas supporter, seulement les fichiers de type ${fileTypes} sont acceptés`
          );
        }
        return accpted;
      });

      setFiles((prv) => {
        return [...prv, ...acceptedFiles];
      });
    },
    [files]
  );
  const handleDelete = (e) => {
    e.preventDefault();
    const { name } = e.target.dataset;
    const newFiles = files.filter((file) => file.name !== name);
    let container = new DataTransfer();
    newFiles.forEach((file) => {
      container.items.add(file);
    });
    uploadInputElRef.current.files = container.files;
    setFiles(newFiles);
  };
  if (!uploadInputElRef || typeof uploadInputElRef !== "object") {
    uploadInputElRef = uploadInputEltest;
  }

  const handleFiles = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragActive(false);
      const droppedFiles = Array.from(e.target.files);
      console.log(files);
      if (maxFiles !== -1 && files.length + droppedFiles.length > maxFiles) {
        toast.warning(
          `Vous ne pouvez pas ajouter plus de ${maxFiles} fichiers`
        );
        return;
      }
      const acceptedFiles = droppedFiles.filter((file) => {
        const ext = file.name.split(".").pop();
        const accpted = fileTypes.includes(ext.toUpperCase());
        if (!accpted) {
          toast.warning(
            `le fichier ${file.name} n'est pas accepté car l'extemsion n'est pas supporter, seulement les fichiers de type ${fileTypes} sont acceptés`
          );
        }
        return accpted;
      });

      setFiles((prv) => {
        return [...prv, ...acceptedFiles];
      });
    },
    [files]
  );

  // useEffect(() => {
  //   if (uploadInputElRef.current) {
  //     uploadInputElRef.current.addEventListener("change", handleFiles, false);
  //   }
  //   return () => {
  //     uploadInputElRef.current &&
  //       uploadInputElRef.current.removeEventListener(
  //         "change",
  //         handleFiles,
  //         false
  //       );
  //   };
  // }, [uploadInputElRef]);

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
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex flex-col items-center w-full border-dashed  ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }  py-8 border-2 justify-center p-5 `}
          >
            {/* <svg
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
            </svg> */}

            <img src="/icons/cloud.png" alt="" />

            <p className="mb-2 text-gray-600">
              {files.length > 0
                ? multpl
                  ? `Les fichiers choisi: ${Array.from(files).reduce(
                      (prv, crrn) => prv + crrn.name + ", ",
                      ""
                    )}`
                  : "Le fichier choisi: " + files[0].name
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
              onChange={handleFiles}
              type="file"
              className="hidden"
              multiple
            />
          ) : (
            <input
              id="dropzone-file"
              ref={uploadInputElRef}
              accept={accepts}
              onChange={handleFiles}
              type="file"
              className="hidden"
            />
          )}
        </label>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {files.map((file) => (
            <div
              className="flex items-center bg-green-500 text-slate-100 p-2 rounded-md"
              key={file.name}
            >
              <img className="h-8 mr-2" src="/icons/file-icon.png" alt="" />
              <p className="mr-2">{file.name}</p>
              <button data-name={file.name} onClick={handleDelete}>
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileInput;
