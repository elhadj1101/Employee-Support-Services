import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import FileInput from "components/utils/FileInput";
import { Button } from "components/ui/button";
import { formatPrice } from "components/utils/utilFunctions";
import { financial_aid_infos } from "api/requests";
import useStore from "store";

function FinancialAid() {
  const { user } = useStore();
  const employeeType = user?.retired ? "retired" : "non_retarder";
  const typeIndMap = {};
  financial_aid_infos.forEach((aid, ind) => {
    typeIndMap[aid.name] = ind;
  });
  const [fileNames, setFileNames] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const filesRef = useRef(null);
  const [aidData, setAidData] = useState({
    aidType: "",
    familyMember: "",
    employeeType: employeeType,
  });
  const [amount, setAmount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (uploadedFiles.length !== fileNames.length) {
      toast.error(
        `Veuillez ajouter tous les fichiers nécessaires, il vous manque ${Math.abs(
          uploadedFiles.length - fileNames.length
        )} fichier(s)`
      );
      return;
    }

    const formData = new FormData();
    formData.append("aidType", aidData.aidType);
    formData.append("familyMember", aidData.familyMember);
    formData.append("employeeType", aidData.employeeType);

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("files[]", uploadedFiles[i]);
    }
    console.log(formData);
  };

  useEffect(() => {
    const data = {
      aidType: sessionStorage.getItem("aid/type") || "",
      familyMember: sessionStorage.getItem("aid/familyMember") || "",
      employeeType: employeeType,
    };
    if (data.aidType !== "") {
      let ff = financial_aid_infos[typeIndMap[data.aidType]].files;
      let amnt = 0;
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
      setFileNames(ff);
      setAmount(amnt);
    }
    setAidData(data);
  }, []);
  return (
    <div className="w-full h-[100vh] flex-grow flex flex-col  bg-gray-bg px-6 py-4">
      <h1 className="font-semibold text-2xl my-2">Demande d'aide financière</h1>

      <form className="" onSubmit={handleSubmit}>
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
            {financial_aid_infos.map((option, ind) => {
              return (
                <SelectItem key={ind} value={option.name}>
                  {option.description}
                </SelectItem>
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
                        financial_aid_infos[typeIndMap[aidData.aidType]].types[
                          option
                        ].desc
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
                  financial_aid_infos[typeIndMap[aidData.aidType]].types[value]
                    .amount
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
                        financial_aid_infos[typeIndMap[aidData.aidType]].types[
                          option
                        ].desc
                      }
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </>
        )}
        {amount !== 0 && (
          <p className="text-lg font-semibold">
            Le Montant bénéficié :
            <span className="ml-3  text-light-blue ">
              {formatPrice(amount, ",")}DA
            </span>
          </p>
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
            key={aidData.aidType}
            uploadInputElRef={filesRef}
            files={uploadedFiles}
            setFiles={setUploadedFiles}
            accepts="application/pdf"
            fileTypes="PDF"
            maxFiles={fileNames.length}
            multpl={true}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-light-blue py-5 text-lg text-white hover:text-white hover:bg-light-blue"
          variant="outline"
        >
          Envoyer la demande
        </Button>
      </form>
    </div>
  );
}

export default FinancialAid;
