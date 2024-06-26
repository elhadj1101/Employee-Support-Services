import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "components/ui/select";
import FormInput from "../../components/utils/FormInput";

import FileInput from "components/utils/FileInput";
import { Button } from "components/ui/button";
import { formatPrice } from "components/utils/utilFunctions";
import { financial_aid_infos } from "api/requests";
import useStore from "store";
import Axios from "api/axios";
import { Link } from "react-router-dom";

function FinancialAid() {
  const { user, setUpdated, aids } = useStore();
  const [oldFiles, setOldFiles] = useState([]);

  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  let aidDraftId = parts[parts.length - 1];
  aidDraftId = aidDraftId === "demande-pret" ? false : parseInt(aidDraftId);
  const crrntAid =
    aidDraftId && aids && aids.filter((aid) => aid.id === aidDraftId)[0];
  const employeeType = user?.retired ? "retired" : "non_retired";
  const typeIndMap = {};
  financial_aid_infos.forEach((aid, ind) => {
    typeIndMap[aid.name] = ind;
  });
  // const categorizedInfo = Object.groupBy(financial_aid_infos, "category");
  let categorizedInfo = financial_aid_infos.reduce((x, y) => {
    (x[y.category] = x[y.category] || []).push(y);

    return x;
  }, {});
  const [fileNames, setFileNames] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const filesRef = useRef(null);
  const [aidData, setAidData] = useState({
    aidType: "",
    familyMember: "",
    employeeType: employeeType,
    amount: 0,
  });
  const [amount, setAmount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    let isDraft = "false";
    if (name === "draft") isDraft = "true";
    if (amount <= 0) {
      toast.error("Veuillez choisir le montant que vous voulez bénéficié");
      return;
    }
    if (aidData.aidType === "") {
      toast.error("Veuillez choisir un type d'aide");
      return;
    }
    if (
      aidData.aidType === "family_member_death" &&
      aidData.familyMember === ""
    ) {
      toast.error("Veuillez choisir un membre de famille");
      return;
    }
    if (aidData.aidType === "employee_death" && aidData.employeeType === "") {
      toast.error("Veuillez choisir un type d'employer");
      return;
    }
    if (uploadedFiles.length + oldFiles.length !== fileNames.length && !(isDraft === "true")) {
      if (uploadedFiles.length + oldFiles.length > fileNames.length) {
        toast.error(
          `Veuillez supprimer ${Math.abs(
            uploadedFiles.length + oldFiles.length - fileNames.length
          )} fichier(s)`
        );
      }else {
        toast.error(
          `Veuillez ajouter tous les fichiers nécessaires, il vous manque ${Math.abs(
            uploadedFiles.length + oldFiles.length - fileNames.length
          )} fichier(s)`
        );
      }
      return;
    }
    if (isDraft === "true" && uploadedFiles.length+ oldFiles.length > fileNames.length) {
      toast.error(
        `Vous ne pouvez pas ajouter plus de fichiers que nécessaire. (max: ${fileNames.length} fichiers)`
      );
      return;
    }
    const endpoint =
      !crrntAid || aidDraftId == false
        ? "/requests/financial-aids/?brouillon="
        : `/requests/financial-aids/${aidDraftId}?brouillon=`;
    const formData = new FormData();
    formData.append("financial_aid_type", aidData.aidType);
    formData.append("amount", amount);

    if (aidData.aidType === "family_member_death") {
      formData.append("family_member", aidData.familyMember);
    }
    uploadedFiles.forEach((file) => {
      formData.append("files[]", file);
    });
    oldFiles.forEach((of) => {
      console.log(of);
      formData.append("old_files[]", of.url.replace("/documents/", ""));
    });
    if (!crrntAid || aidDraftId == false) {
      Axios.post(endpoint + isDraft, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setUpdated("aids");
          toast.success(
            (isDraft === "false" ? "La demande" : "Le brouillon") +
              " a été envoyée avec succès"
          );
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data?.detail) {
              toast.error(err.response.data?.detail);
            } else if (err.response.data?.error) {
              toast.error(err.response.data.error);
            
            } else if (err.response.data.errors) {
              toast.error(
                err.response.data.errors
              );
            } else {
              toast.error(
                "Une erreur s'est produite lors de l'envoi de la demande"
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
          setUpdated("aids");
          toast.success(
            (isDraft === "true" ? "La demande" : "Le brouillon") +
              " a été envoyée avec succès"
          );
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data?.detail) {
              toast.error(err.response.data?.detail);
            } else if (err.response.data?.error) {
              toast.error(err.response.data.error);
            } else if (
              err.response.data.errors) {
             toast.error(err.response.data.errors);
            } else {
              toast.error(
                "Une erreur s'est produite lors de l'envoi de la demande"
              );
            }
          } else {
            toast.error(
              "Une erreur s'est produite lors de l'envoi de la demande"
            );
          }
        });
    }
  };

  useEffect(() => {
    const data = {
      aidType: crrntAid
        ? crrntAid.financial_aid_type
        : sessionStorage.getItem("aid/type") || "",
      familyMember: crrntAid
        ? crrntAid.familyMember
        : sessionStorage.getItem("aid/familyMember") || "",
      employeeType: employeeType,
    };
    let amnt = crrntAid
        ? crrntAid.amount
        : 0;
    let oldF = crrntAid
      ? crrntAid.documents.map((doc) => {
          return {
            name: doc.document_name,
            url: doc.document_file,
            size: doc.document_size * 1000,
          };
        })
      : [];
    setOldFiles(oldF);
    if (data.aidType !== "") {
      let ff = financial_aid_infos[typeIndMap[data.aidType]].files;
      if (amnt === 0) {

      if (data.aidType === "family_member_death") {
          Object.entries(
            financial_aid_infos[typeIndMap[data.aidType]].types
          ).forEach((key) => {
            if (key[0] === data.familyMember) {
              ff = ff.concat(key[1].files);
              amnt = key[1].amount;
          }
        });
      } else if (data.aidType === "employee_death") {
        if (data.employeeType) {
          amnt =
          financial_aid_infos[typeIndMap[data.aidType]].types[
            data.employeeType
          ].amount;
        } else {
          amnt = 0;
        }
      } else {
        amnt = financial_aid_infos[typeIndMap[data.aidType]].amount;
      }
    }
      setFileNames(ff);
      setAmount(amnt);
    }
    setAidData(data);
  }, [aids]);
  return (
    <div className="w-full h-[90vh] overflow-y-auto flex-grow flex flex-col  bg-gray-bg  pb-6">
      <div className="px-6 py-6 pt-8 bg-gray-bg sticky top-0 z-50">
        <h1 className="font-semibold text-2xl ">
          {!crrntAid
            ? "Demande d'aide financière"
            : "Modification d'un brouillon (N°:" + crrntAid.id + ")"}
        </h1>
      </div>
      {(!crrntAid && aidDraftId) ||
      (crrntAid && crrntAid.financial_aid_status !== "brouillon") ? (
        <>
          <div className="flex  items-start">
            <p className="text-red-800 mx-6 text-lg">
              Vous n'avez aucun brouillon de demande de prêt avec le numéro:{" "}
              {aidDraftId}
              <br />
              <span className="ml-0 underline hover:text-darkblue">
                <Link to="/liste-demandes-aide-financiere">
                  Consulter votre demandes
                </Link>
              </span>
            </p>
          </div>
        </>
      ) : (
        <form className="px-6">
          <label
            htmlFor="aidType"
            className="block mb-2  font-medium text-gray-900 dark:text-white"
          >
            Le type de l'aide financière
          </label>

          <Select
            id="aidType"
            value={aidData.aidType}
            name="aidType"
            onValueChange={(value) => {
              const emptyFiles = new DataTransfer();
              filesRef.current.files = emptyFiles.files;
              setUploadedFiles([]);
              sessionStorage.setItem(`aid/type`, value);
              setAidData((prev) => {
                return { ...prev, ["aidType"]: value };
              });
              let ff = financial_aid_infos[typeIndMap[value]].files;
              let fmember = sessionStorage.getItem("aid/familyMember") || "";

              if (value === "family_member_death") {
                if (fmember !== "") {
                  Object.entries(
                    financial_aid_infos[typeIndMap[value]].types
                  ).forEach((key) => {
                    if (key[0] === fmember) {
                      ff = ff.concat(key[1].files);
                      setAmount(key[1].amount);
                    }
                  });
                } else {
                  setAmount(0);
                }
              } else if (value === "employee_death") {
                if (aidData.employeeType) {
                  setAmount(
                    financial_aid_infos[typeIndMap[value]].types[
                      aidData.employeeType
                    ].amount
                  );
                } else {
                  setAmount(0);
                }
              } else {
                setAmount(financial_aid_infos[typeIndMap[value]].amount);
              }
              setFileNames(ff);
            }}
          >
            <SelectTrigger className="w-full bg-white mb-2">
              <SelectValue placeholder="Choissisez un type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categorizedInfo).map(([category, aids], ind) => {
                return (
                  <SelectGroup key={ind}>
                    <SelectLabel>{category}</SelectLabel>
                    {aids.map((aid, ind) => {
                      return (
                        <SelectItem key={ind} value={aid.name}>
                          {aid.description}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
          {aidData.aidType === "family_member_death" && (
            <>
              <label
                htmlFor="familyMember"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Le membre défunt de la famille
              </label>
              <Select
                id="familyMember"
                value={aidData.familyMember}
                name="familyMember"
                onValueChange={(value) => {
                  sessionStorage.setItem("aid/familyMember", value);

                  const prev = { ...aidData, ["familyMember"]: value };
                  const ff =
                    financial_aid_infos[typeIndMap[aidData.aidType]].files;

                  Object.entries(
                    financial_aid_infos[typeIndMap[aidData.aidType]].types
                  ).forEach((key) => {
                    if (key[0] === value) {
                      setFileNames(ff.concat(key[1].files));
                      setAmount(key[1].amount);
                    }
                  });
                  setAidData(prev);
                }}
              >
                <SelectTrigger className="w-full bg-white mb-2">
                  <SelectValue placeholder="Choissisez un membre de famille" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(
                    financial_aid_infos[typeIndMap[aidData.aidType]].types
                  ).map((option, ind) => {
                    return (
                      <SelectItem key={ind} value={option}>
                        {
                          financial_aid_infos[typeIndMap[aidData.aidType]]
                            .types[option].desc
                        }
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </>
          )}
          {aidData.aidType === "employee_death" && (
            <>
              <label
                htmlFor="employeeType"
                className="block mb-2 font-medium text-gray-900 dark:text-white"
              >
                Le type de l'employer
              </label>
              <Select
                id="employeeType"
                value={aidData.employeeType}
                name="employeeType"
                disabled
                onValueChange={(value) => {
                  sessionStorage.setItem("aid/employeeType", value);
                  const prev = { ...aidData, ["employeeType"]: value };
                  setAidData(prev);
                  setAmount(
                    financial_aid_infos[typeIndMap[aidData.aidType]].types[
                      value
                    ].amount
                  );
                }}
              >
                <SelectTrigger className="w-full bg-white mb-2">
                  <SelectValue placeholder="Choissisez le type d'employer" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(
                    financial_aid_infos[typeIndMap[aidData.aidType]].types
                  ).map((option, ind) => {
                    return (
                      <SelectItem key={ind} value={option}>
                        {
                          financial_aid_infos[typeIndMap[aidData.aidType]]
                            .types[option].desc
                        }
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </>
          )}
          {amount !== 0 &&
            !financial_aid_infos[typeIndMap[aidData.aidType]].amountNotes && (
              <p className="text-lg font-semibold">
                Choisir Le Montant bénéficié :
                <input
                  type="text"
                  value={amount}
                  className="w-20 text-center border-2 border-gray-300 rounded-md mx-2"
                  onChange={(e) => {
                    let v = e.target.value;
                    console.log(parseInt(v));
                    let notNum = true;
                    Array.from(v).forEach((c) => {
                      if (
                        ![
                          "0",
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                        ].includes(c)
                      ) {
                        notNum = false;
                        return;
                      }
                    });

                    if (notNum) {
                      setAmount(parseInt(v));
                    }
                  }}
                />
                DA
              </p>
            )}
          {aidData.aidType !== "" &&
            financial_aid_infos[typeIndMap[aidData.aidType]]?.amountNotes &&
            aidData.aidType !== "family_member_death" && (
              <div className="text-lg font-semibold">
                Choisir Le Montant bénéficié :
                <input
                  type="text"
                  value={amount}
                  className="w-20 text-center border-2 border-gray-300 rounded-md mx-2"
                  onChange={(e) => {
                    let v = e.target.value;
                    if (v.trim()   === "") {
                      setAmount("");
                      return;
                    }
                    let notNum = true;
                    Array.from(v).forEach((c) => {
                      if (
                        ![
                          "0",
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                        ].includes(c)
                      ) {
                        notNum = false;
                        return;
                      }
                    });

                    if (notNum) {
                      setAmount(parseInt(v));
                    }
                  }}
                />
                DA
                <ul className="pl-4 text-sm w- list-decimal font-light ">
                  {financial_aid_infos[
                    typeIndMap[aidData.aidType]
                  ].amountNotes.map((note, ind) => {
                    return (
                      <li className="" key={ind}>
                        {note}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          {aidData.aidType !== "" && (
            <>
              <h2 className="font-semibold text-lg mt-4">
                Les fichiers nécessaires
                <span style={{ color: "red" }}> * </span>
              </h2>
              <ul className="pl-4 text-sm w- list-decimal font-light ">
                {fileNames &&
                  fileNames.map((file, ind) => {
                    return (
                      <li className="" key={ind}>
                        {file}
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
          <div className="w-full my-4 ">
            <FileInput
              oldFiles={oldFiles}
              setOldFiles={setOldFiles}
              key={aidData.aidType}
              uploadInputElRef={filesRef}
              files={uploadedFiles}
              setFiles={setUploadedFiles}
              accepts="application/pdf"
              fileTypes={["PDF"]}
              maxFiles={fileNames.length}
              multpl={true}
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              onClick={handleSubmit}
              name="not-draft"
              className=" bg-light-blue py-5   outline-none border-none text-white hover:text-light-blue hover:bg-white  transition"
            >
              Envoyer la demande
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              name="draft"
              className=" bg-white py-5 text-light-blue  outline-none border-none  hover:bg-light-blue hover:text-white transition"
            >
              Sauvegarder comme brouillon
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FinancialAid;
