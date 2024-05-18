import FileUploaded from "components/FileUploaded";
import { set } from "date-fns";
import React, { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function FileInput({
  labell = "",
  iconSrc = "/icons/Pdf-icon.png",
  oldFiles = [],
  setOldFiles = null,
  uploadInputElRef = null,
  files = null,
  maxFiles = -1,
  setFiles = null,
  setSingleFile = null,
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
      if (
        maxFiles !== -1 &&
        files?.length + droppedFiles.length + oldFiles.length > maxFiles
      ) {
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
      if (setSingleFile) {
        setSingleFile(acceptedFiles[0]);
        setFiles((prv) => {
          return [...prv, ...acceptedFiles];
        });
      }else{
        setFiles((prv) => {
          return [...prv, ...acceptedFiles];
        });
      }
    },
    [files]
  );
  const handleDelete = (e) => {
    e.preventDefault();
    const { name } = e.target.dataset;
    const newFiles = files.filter((file) => file.name !== name);
    const newOlds = oldFiles.filter((f) => f.name !== name);
    setOldFiles(newOlds);

    let container = new DataTransfer();
    newFiles.forEach((file) => {
      container.items.add(file);
    });
    uploadInputElRef.current.files = container.files;
    if (setSingleFile) {
      setFiles([]);
      setSingleFile(null);
    } else {
      setFiles(newFiles);
    }
  };

  if (!uploadInputElRef || typeof uploadInputElRef !== "object") {
    uploadInputElRef = uploadInputEltest;
  }

  const handleFiles = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragActive(false);
      const droppedFiles = Array.from(e.target.files);
      let accptedF = [];
      droppedFiles.forEach((f) => {
        let chk1 = oldFiles.filter((of) => of.name === f.name);
        let chk2 = files.filter((ff) => ff.name === f.name);
        if (chk1.length + chk2.length > 0) {
          toast.error(
            "Vous ne pouvez pas ajouter des fichiers ayont le meme nom."
          );
        } else {
          accptedF.push(f);
        }
      });
      if (
        maxFiles !== -1 &&
        files.length + accptedF.length + oldFiles.length > maxFiles
      ) {
        toast.warning(
          `Vous ne pouvez pas ajouter plus de ${maxFiles} fichiers`
        );
        return;
      }
      const acceptedFiles = accptedF.filter((file) => {
        const ext = file.name.split(".").pop();
        const accpted = fileTypes.includes(ext.toUpperCase().trim() +" ");

        if (!accpted) {
          toast.warning(
            `le fichier ${file.name} n'est pas accepté car l'extemsion n'est pas supporter, seulement les fichiers de type ${fileTypes} sont acceptés`
          );
        }
        return accpted;
      });
      if (setSingleFile) {
        setSingleFile(acceptedFiles[0]);
        setFiles((prv) => {
          return [...prv, ...acceptedFiles];
        });
        return;
      }else {
        setFiles((prv) => {
          return [...prv, ...acceptedFiles];
        });
      }
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
    <div className="flex flex-col gap-1 ">
      {labell !== "" && (
        <label htmlFor="upload" className="">
          {labell}
          <span style={{ color: "red" }}> * </span>
        </label>
      )}
      <div className="mt-2 flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex  flex-col items-center justify-center w-full mx-auto h-full border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
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
      {files.length + oldFiles.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {oldFiles.map((file, i) => {
            return (
              <Link
                key={i}
                to={"http://127.0.0.1:8000" + file.url}
                target="blank"
              >
                <FileUploaded
                  name={file.name}
                  size={file.size}
                  Delete={handleDelete}
                  iconSrc={iconSrc}
                />
              </Link>
            );
          })}
          {files.map((file, i) => (
            /*      <div
              className="flex items-center bg-green-500 text-slate-100 p-2 rounded-md"
              key={file.name}
            >
              <img className="h-8 mr-2" src="/icons/file-icon.png" alt="" />
              <p className="mr-2">{file.name}</p>
              <button data-name={file.name} onClick={handleDelete}>
                X
              </button>
            </div>  */
            <FileUploaded
              key={i}
              name={file.name}
              size={file.size}
              Delete={handleDelete}
              iconSrc={iconSrc}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileInput;
