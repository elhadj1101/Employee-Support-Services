import { DatePickerDemo } from "Components/ui/DatePiker";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import useStore from "../../store/index.js";
export default function AddUser() {
  const { AddUserData, setAddUserData } = useStore();
  const [newErrors, setNewErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    sessionStorage.setItem(`form/${name}`, value);
    const prev = { ...AddUserData, [name]: value };
    setAddUserData(prev);
    console.log(sessionStorage);
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();

    let newErrors = {};

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide.";
    }

    // Validate password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!formData.password.trim() || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule et un chiffre.";
    }

    // Validate RIB length
    if (
      !formData.bank_rib.trim() ||
      formData.bank_rib.trim().length !== 20 ||
      isNaN(Number(formData.bank_rib))
    ) {
      newErrors.bank_rib = "Le RIB doit comporter exactement 20 chiffres.";
    }

    // Validate phone number length
    if (
      !formData.phone_number.trim() ||
      formData.phone_number.trim().length !== 10 ||
      isNaN(Number(formData.phone_number))
    ) {
      newErrors.phone_number = "Le numéro de téléphone doit comporter exactement 10 chiffres.";
    }

    // Validate RIP length
    if (
      !formData.rip.trim() ||
      formData.rip.trim().length !== 20 ||
      isNaN(Number(formData.rip))
    ) {
      newErrors.rip = "Le RIP doit comporter exactement 20 chiffres.";
    }

    // Validate ID number length
    if (
      !formData.id_number.trim() ||
      formData.id_number.trim().length !== 18
    ) {
      newErrors.id_number = "Le numéro d'identification doit comporter exactement 18 caractères.";
    }
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} est requis.`;
      }
    });
    // Check if any errors occurred
    if (Object.keys(newErrors).length !== 0) {
      setNewErrors(newErrors);
      Object.keys(newErrors).forEach((key) => {
        console.log(newErrors[key]);
      });
      return;
    }

    // If no errors, submit the form
    console.log("Form submitted:", formData);
  };



  return (
    <div className="w-full flex-grow flex flex-col  bg-lightgray">
      <div className="px-6 pb-4 flex flex-col flex-grow relative ">
        <div className="flex items-center justify-between">
          <h1 className=" sticky top-[60px] pt-5 pb-6 bg-lightgray text-xl lg:text-2xl text-black font-bold capitalize">
            Remplir les données du nouveau utilisateur
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <div
              onClick={() => {
                toast.success("Event has been created");
              }}
              className=" bg-light-blue cursor-pointer rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
            >
              <p className="capitalize">Enregister</p>
            </div>
            <div
              onClick={() => {
                toast.success("Event has been created");
              }}
              className=" border cursor-pointer bg-white border-[#e5e4e4] rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg  "
            >
              <p className="capitalize">Annuler</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col flex-grow bg-white p-4 rounded-lg  overflow-auto">
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
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.first_name}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.first_name
                     ? "red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
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
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.last_name}
                  onChange={(e) => handleChange(e)}
                 
                  style={{
                    borderColor: newErrors?.last_name
                      ? "red"
                      : " rgb(229 231 235 / var(--tw-border-opacity))"  ,
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
                  placeholder="N° Pièce d'identification"
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.id_number}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.id_number
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
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
                  placeholder="Adresse e-mail"
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.email}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.email
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
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
                  type="tel"
                  placeholder="Téléphone"
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.phone_number}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.phone_number
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
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
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.password}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.password
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
                  }}
                />
                <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                  {newErrors?.password}
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
                  value={AddUserData.role}
                >
                  <SelectTrigger className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base">
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="president">
                      Président du Comité
                    </SelectItem>
                    <SelectItem value="vice_president">
                      Vice-Président du Comité
                    </SelectItem>
                    <SelectItem value="tresorier">
                      Trésorier du Comité
                    </SelectItem>
                    <SelectItem value="membre">Membre du Comité</SelectItem>
                    <SelectItem value="employe">Employé(e)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                  {newErrors?.role}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="upload" className="mb-2">
                  Photo de l'utilisateur
                  <span style={{ color: "red" }}> * </span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full mx-auto h-56 border-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
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
                      <p className="mb-2 text-sm  text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG or JPG (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
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
                  type="number"
                  placeholder="Salaire"
                  min="0"
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.salary}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.birth_adress
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
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
                <input
                  id="rip"
                  name="rip"
                  type="text"
                  placeholder="CCP Rip"
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.rip}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.rip
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
                  }}
                />
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
                  placeholder="RIB Bancaire"
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.bank_rib}
                  onChange={(e) => handleChange(e)}
                 
                  style={{
                    borderColor: newErrors?.bank_rib
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
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
                  value={AddUserData.sexe}
                  name="sexe"
                  onValueChange={(value) => {
                    sessionStorage.setItem(`form/sexe`, value);

                    const prev = { ...AddUserData, ["sexe"]: value };
                    setAddUserData(prev);
                  }}
                >
                  <SelectTrigger className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base">
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
                  value={AddUserData.martial_situation}
                  onValueChange={(value) => {
                    sessionStorage.setItem(`form/martial_situation`, value);
                    const prev = {
                      ...AddUserData,
                      ["martial_situation"]: value,
                    };
                    setAddUserData(prev);
                  }}
                >
                  <SelectTrigger className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base">
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
                  className="bg-transparent border-1 border-gray-200 outline-none h-12 rounded-lg px-4 text-base"
                  value={AddUserData.birth_adress}
                  onChange={(e) => handleChange(e)}
                  style={{
                    borderColor: newErrors?.birth_adress
                     ?"red"
                      :" rgb(229 231 235 / var(--tw-border-opacity))",
                  }}
                />
                <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                  {newErrors?.birth_adress}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="birth_date">
                  Date de naissance<span style={{ color:" rgb(229 231 235 / var(--tw-border-opacity))" }}> * </span>
                </label>
                {/* Replace DatePickerDemo with your actual component */}
                <DatePickerDemo
                  id="dateNaissance"
                  name="dateNaissance"
                  value={AddUserData.birth_date}
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
                  toast.success("Event has been created");
                }}
                className=" border cursor-pointer bg-white border-[#e5e4e4] rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg  "
              >
                <p className="capitalize">Annuler</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
