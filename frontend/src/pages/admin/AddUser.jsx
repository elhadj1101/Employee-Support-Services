import { DatePickerDemo } from "components/ui/DatePiker";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import useStore from "../../store/index.js";
import { createUser, getUsers } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const { AddUserData, setAddUserData, setAdminUsers } = useStore();
  const [newErrors, setNewErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("formCleared") !== "true") {
      sessionStorage.setItem("formCleared", "true");
      window.location.reload();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = "";

    switch (name) {
      case "last_name":
        formattedValue = value.replace(/[^a-zA-Z ]/g, "");
        break;
      case "first_name":
        formattedValue = value.replace(/[^a-zA-Z ]/g, "");
        break;
      case "id_number":
        formattedValue = value.replace(/[^0-9]/, "");
        formattedValue = formattedValue.replace(/(\d{2})(?=\d)/g, "$1 ");

        break;
      case "salary":
        formattedValue = value.replace(/[^0-9]/, "");
        formattedValue = formattedValue.replace(/(\d{3})(?=\d)/g, "$1,");

        break;
      case "bank_rib":
        formattedValue = value.replace(/[^0-9]/, "");
        formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
        break;
      case "rip":
        formattedValue = value.replace(/[^0-9]/g, "");

        // Format the value (e.g., add a space after the first 10 digits)
        if (formattedValue.length > 10) {
          formattedValue = formattedValue.replace(/(\d{10})(\d+)/, "$1 $2");
        }
    
        break;
      case "retired":
        formattedValue = !AddUserData?.retired;
        break;

      case "phone_number":
        // Remove all non-digit characters from the input value
        const digitsOnly = value.replace(/[^0-9]/g, "");

        // Check if the first digit is 0
        const firstDigit = digitsOnly.charAt(0);
        if (firstDigit === "0") {
          if (digitsOnly.length === 1) {
            // If only one digit is entered and it's 0, keep it
            formattedValue = digitsOnly.charAt(0);
          } else if (digitsOnly.length >= 2) {
            // If more than one digit is entered, check the second digit
            const secondDigit = digitsOnly.charAt(1);
            if (["5", "6", "7"].includes(secondDigit)) {
              // If the second digit is 5, 6, or 7, format the phone number
              if (digitsOnly.length <= 2) {
                formattedValue = digitsOnly;
              } else if (digitsOnly.length <= 6) {
                formattedValue = `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(
                  2
                )}`;
              } else {
                formattedValue = `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(
                  2,
                  6
                )} ${digitsOnly.slice(6, 10)}`;
              }
            } else {
              // If the second digit is not 5, 6, or 7, reset the value
              formattedValue = digitsOnly.charAt(0);
            }
          }
        } else {
          // If the first digit is not 0, reset the value
          formattedValue = "";
        }
        break;
      default:
        formattedValue = value;
        break;
    }

    sessionStorage.setItem(`form/${name}`, formattedValue);
    const prev = { ...AddUserData, [name]: formattedValue };
    setAddUserData(prev);
  };
  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    let newErrors = {};

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newErrors.email) delete newErrors.email;
    if (!formData.email.replace(/ /g, "") || !emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide.";
    }

    // Validate password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (newErrors.password) delete newErrors.password;

    if (
      !formData.password.replace(/ /g, "") ||
      !passwordRegex.test(formData.password.replace(/ /g, ""))
    ) {
      newErrors.password =
        "Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.";
    }
    if (newErrors.bank_rib) delete newErrors.bank_rib;

    // Validate RIB length
    console.log("ribbbb", formData.bank_rib.replace(/ /g, ""));
    if (
      formData.bank_rib.replace(/ /g, "") &&
      formData.bank_rib.replace(/ /g, "").length !== 20
    ) {
      newErrors.bank_rib = "Le RIB doit comporter exactement 20 chiffres.";
    }
    if (newErrors.phone_number) delete newErrors.phone_number;

    // Validate phone number length
    if (
      !formData.phone_number.replace(/ /g, "") ||
      formData.phone_number.replace(/ /g, "").length !== 10
    ) {
      newErrors.phone_number =
        "Le numéro de téléphone doit comporter exactement 10 chiffres.";
    }
    if (newErrors.rip) delete newErrors.rip;

    // Validate RIP length
    if (
      !formData.rip.replace(/ /g, "") ||
      formData.rip.replace(/ /g, "").length + "00799999".length !== 20
    ) {
      newErrors.rip = "Le RIP doit comporter exactement 20 chiffres.";
    }

    if (newErrors.id_number) delete newErrors.id_number;

    // Validate ID number length
    if (
      !formData.id_number.replace(/ /g, "") ||
      formData.id_number.replace(/ /g, "").length !== 18
    ) {
      newErrors.id_number =
        "Le numéro d'identification doit comporter exactement 18 caractères.";
    }

    // retired and retired_at
    if (formData.retired && formData.retired_at === "") {
      newErrors.retired_at = "date de Retirement est requis.";
    }
    if (formData.retired_at === "" && !formData.retired) {
      formData.retired_at = null;
    }
    Object.keys(formData).forEach((key) => {
      if (newErrors.key) delete newErrors.key;
      if (
        !formData[key] &&
        key !== "is_active" &&
        key !== "retired_at" &&
        key !== "retired"
      ) {
        newErrors[key] = `${key.replace("_", " ")} est requis.`;
      }
    });

    // Check if any errors occurred
    if (Object.keys(newErrors).length !== 0) {
      setNewErrors(newErrors);
      return;
    }

    Object.keys(formData).forEach((key) => {
      if (formData[key] && key !== "is_active" && key !== "retired") {
        formData[key] = formData[key].replace(/ /g, "");
      }
    });
    try {
      const newUser = await createUser({
        ...AddUserData,
        rip: "00799999" + AddUserData?.rip.replace(/ /g, ""),
        salary: AddUserData?.salary.replace(/,/g, ""),
      });

      if (newUser.status === 201) {
        toast.success("Utilisateur créé avec succès");
        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith("form/")) {
            sessionStorage.removeItem(key);
          }
        });
        sessionStorage.setItem("formCleared", "true");

        try {
          const updatedUsers = await getUsers();

          if (updatedUsers) {
            setAdminUsers(updatedUsers);
            navigate("/utilisateurs");
          }
        } catch (err) {}
      }
    } catch (error) {
      if (error.response) {
        if (error.status === 400) {
          for (const key in error.data) {
            toast.error(error.data[key][0]);
            break;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 bg-lightgray text-xl lg:text-2xl text-black font-bold capitalize">
          Remplir les données du nouveau utilisateur
        </h1>
        <div className="flex gap-2 justify-center items-center">
          <div
            onClick={(e) => {
              handleSubmit(e, AddUserData);
            }}
            className=" bg-light-blue cursor-pointer rounded-lg px-5 py-2 text-white hover:bg-white hover:text-light-blue transition "
          >
            <p className="capitalize">Enregister</p>
          </div>
          <div
            onClick={() => {
              Object.keys(sessionStorage).forEach((key) => {
                if (key.startsWith("form/")) {
                  sessionStorage.removeItem(key);
                }
              });
            }}
            className=" text-light-blue  cursor-pointer bg-white rounded-lg  px-5 py-2 hover:bg-light-blue hover:text-white transition  "
          >
            <p className="capitalize">Annuler</p>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-white p-4 pt-0 lg:p-6 rounded-lg">
        <p className="mb-4 font-medium ">
          Remplir les données du nouveau utilisateur
        </p>
        <form className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold py-2 mb-2 mt-4 border-l-4 border-light-blue px-3 bg-[#e2e8ff] text-light-blue text-lg  ">
              1. Informations sur l'employé{" "}
            </h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="first_name">
                Nom<span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Nom"
                className=" w-full bg-transparent border border-lightgray outline-none   h-12 rounded-lg px-4 text-base"
                value={AddUserData?.first_name}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.first_name
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3 ">
                {newErrors?.first_name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="last_name">
                Prénom<span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Prénom"
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.last_name}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.last_name
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.last_name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="id_number">
                N° Pièce d'identification
                <span style={{ color: "red" }}> * </span>
              </label>

              <input
                id="id_number"
                name="id_number"
                type="text"
                placeholder="XX XX XX XX XX XX XX XX XX"
                maxLength={26}
                className=" relative w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.id_number}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.id_number
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />

              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.id_number}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">
                Address e-mail<span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.email}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.email
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors.email}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone_number">
                Phone<span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                placeholder="0X XXXX XXXX"
                maxLength={12}
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.phone_number}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.phone_number
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.phone_number}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">
                Mot de passe <span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="password"
                name="password"
                type="text"
                placeholder="mot de passe"
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.password}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.password
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.password}
              </p>
            </div>
            <div className=" mt-5 flex flex-col gap-1">
              <label className="pb-1" htmlFor="recruted_at">
                date de Recrutement
                <span style={{ color: "red" }}> *</span>
              </label>
              <DatePickerDemo
                id="dateNaissance"
                name="dateNaissance"
                value={AddUserData?.recruted_at}
                input="recruted_at"
              />
              <p className="text-red-500 text-[11px]  font-light mb-1 h-3">
                {newErrors?.recruted_at}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="role">
                Role<span style={{ color: "red" }}> * </span>
              </label>

              <Select
                name="role"
                onValueChange={(value) => {
                  sessionStorage.setItem(`form/role`, value);

                  const prev = { ...AddUserData, ["role"]: value };
                  setAddUserData(prev);
                }}
                value={AddUserData?.role}
              >
                <SelectTrigger className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base">
                  <SelectValue placeholder="Choisir un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="president">Président du Comité</SelectItem>
                  <SelectItem value="vice_president">
                    Vice-Président du Comité
                  </SelectItem>
                  <SelectItem value="tresorier">Trésorier du Comité</SelectItem>
                  <SelectItem value="membre">Membre du Comité</SelectItem>
                  <SelectItem value="employe">Employé(e)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.role}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                id="retired"
                name="retired"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={AddUserData?.retired}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="retired">Est-il retraité ?</label>
            </div>

            {AddUserData?.retired && (
              <div className=" mt-5 flex flex-col gap-1">
                <label htmlFor="retired_at">
                  date de Retirement
                  <span style={{ color: "red" }}> *</span>
                </label>
                <DatePickerDemo
                  id="dateNaissance"
                  name="dateNaissance"
                  value={AddUserData?.retired_at}
                  input="retired_at"
                />
                <p className="text-red-500 text-[11px]  font-light mb-1 h-3">
                  {newErrors?.retired_at}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold py-2 mb-2 mt-4 border-l-4 border-light-blue px-3 bg-[#e2e8ff] text-light-blue text-lg  ">
              2. Informations financières{" "}
            </h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="salary">
                Salaire<span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                placeholder="XXXXXX"
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.salary}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.salary
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.salary}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="rip">
                CCP Rip<span style={{ color: "red" }}> * </span>
              </label>
              <div className="relative">
                <input
                  id="rip"
                  name="rip"
                  type="text"
                  maxLength={13}
                  placeholder="XXXXXXXXXX XX"
                  className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base pl-[91px]"
                  value={AddUserData?.rip}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.rip
                      ? "red"
                      : " rgb(229 231 235 / var(--tw-border-opacity))",
                  }}
                />
                <p
                  className={`pl-2 absolute top-1/2 left-0 -translate-y-1/2  ${
                    AddUserData?.rip.length !== 0 ? "" : "text-gray-500"
                  } `}
                >
                  00799999
                </p>
              </div>
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.rip}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="bank_rib">RIB Bancaire</label>
              <input
                id="bank_rib"
                name="bank_rib"
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={24}
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.bank_rib}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.bank_rib
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.bank_rib}
              </p>
            </div>
            <h2 className="font-semibold py-2 mb-2 mt-4 border-l-4 border-light-blue px-3 bg-[#e2e8ff] text-light-blue text-lg  ">
              3. Informations personnelles{" "}
            </h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="sexe">
                Sexe<span style={{ color: "red" }}> * </span>
              </label>
              <Select
                value={AddUserData?.sexe}
                name="sexe"
                onValueChange={(value) => {
                  sessionStorage.setItem(`form/sexe`, value);

                  const prev = { ...AddUserData, ["sexe"]: value };
                  setAddUserData(prev);
                }}
              >
                <SelectTrigger className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base">
                  <SelectValue placeholder="Choisir le sexe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-[11px] font-light mb-1 h-3">
                {newErrors?.sexe}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="martial_situation">
                Situation Familiale<span style={{ color: "red" }}> * </span>
              </label>
              <Select
                value={AddUserData?.martial_situation}
                onValueChange={(value) => {
                  sessionStorage.setItem(`form/martial_situation`, value);
                  const prev = {
                    ...AddUserData,
                    ["martial_situation"]: value,
                  };
                  setAddUserData(prev);
                }}
              >
                <SelectTrigger className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base">
                  <SelectValue placeholder="Choisir la situation familiale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marie">Marié(e)</SelectItem>
                  <SelectItem value="divorce">Divorcé(e)</SelectItem>
                  <SelectItem value="celibataire">Célibataire</SelectItem>
                  <SelectItem value="veuf">Veuf(ve)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.martial_situation}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="birth_adress">
                Lieu de naissance<span style={{ color: "red" }}> * </span>
              </label>
              <input
                id="birth_adress"
                name="birth_adress"
                type="text"
                placeholder="Lieu de naissance"
                className="w-full bg-transparent border border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                value={AddUserData?.birth_adress}
                onChange={(e) => handleChange(e)}
                style={{
                  borderColor: newErrors?.birth_adress
                    ? "red"
                    : " rgb(229 231 235 / var(--tw-border-opacity))",
                }}
              />
              <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                {newErrors?.birth_adress}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="birth_date">
                Date de naissance
                <span style={{ color: "red" }}> * </span>
              </label>
              {/* Replace DatePickerDemo with your actual component */}
              <DatePickerDemo
                id="dateNaissance"
                name="dateNaissance"
                value={AddUserData?.birth_date}
                input="birth_date"
              />
              <p className="text-red-500 text-[11px]  font-light mb-1 h-3">
                {newErrors?.birth_date}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              onClick={(e) => {
                handleSubmit(e, AddUserData);
              }}
              className=" bg-light-blue cursor-pointer rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
            >
              <p className="capitalize">Enregister</p>
            </div>
            <div
              onClick={() => {
                Object.keys(sessionStorage).forEach((key) => {
                  if (key.startsWith("form/")) {
                    sessionStorage.removeItem(key);
                  }
                });
              }}
              className=" border cursor-pointer bg-white border-[#e5e4e4] rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg  "
            >
              <p className="capitalize">Annuler</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
