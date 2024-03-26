import { DatePickerDemo } from "../../components/ui/DatePikerProfile";
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
import { getUser, updateUser } from "api/auth";
export default function UserProfile() {
  const { UserProfileData, setProfileUserData, profileRequsted } =
    useStore();
  const [newErrors, setNewErrors] = useState({});
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profileRequsted && profileRequsted !== "[object Object]") {
          const response = await getUser(profileRequsted);
          Object.entries(response).forEach(([key, value], index) => {
            switch (key) {
              case "id_number":
                response[key] = value.replace(/(\d{2})(?=\d)/g, "$1 ");
                break;

              case "salary":
                response[key] = value.replace(/(\d{3})(?=\d)/g, "$1,");
                break;
              case "bank_rib":
                response[key] = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                break;
              case "rip":
                const v =value.replace('00799999' , '')
                response[key] = v.replace(/(\d{10})/g, "$1 ");
                break;

              case "phone_number":
                // Remove all non-digit characters from the input value
                const digitsOnly = value;

                // Check if the first digit is 0

                if (digitsOnly.length <= 2) {
                  response[key] = digitsOnly;
                } else if (digitsOnly.length <= 6) {
                  response[key] = `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(
                    2
                  )}`;
                } else {
                  response[key] = `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(
                    2,
                    6
                  )} ${digitsOnly.slice(6, 10)}`;
                }

                break;
              default:
                response[key] = value;
                break;
            }
          });
          setProfileUserData(response);
        } else {
          console.log(localStorage.getItem("profileRequsted"));
          console.log("no profile to fetch");
        }
      } catch (error) {
        if (error) {
          console.log(error);
        } else {
          toast.error(
            "Une erreur s'est produite lors de la récupération des données."
          );
          return "error";
        }
      }
    };

    fetchData();
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
        formattedValue = value.replace(/[^0-9,]/, "");
        formattedValue = formattedValue.replace(/(\d{3})(?=\d)/g, "$1,");

        break;
        case "retired":
        formattedValue = (!UserProfileData.retired)
        break;
      case "bank_rib":
        formattedValue = value.replace(/[^0-9]/, "");
        formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
        break;
      case "rip":
        formattedValue = value.replace(/[^0-9]/, "");
        formattedValue = formattedValue.replace(/(\d{10})(?=\d)/g, "$1 ");
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
    console.log(name, value);
    localStorage.setItem(`profile/${name}`, formattedValue);
    const prev = { ...UserProfileData, [name]: formattedValue };
    setProfileUserData(prev);
  };
  const handleEdit = () => {
    setReadOnly(false);
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    let newErrors = {};

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newErrors.email) delete newErrors.email;
    if (!formData.email.replace(/ /g, '')|| !emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide.";
    }
    if (newErrors.bank_rib) delete newErrors.bank_rib;

    // Validate RIB length
    console.log('ribbbb' , formData.bank_rib.replace(/ /g, ''));
    if (
      (formData.bank_rib.replace(/ /g, '')&& formData.bank_rib.replace(/ /g, '').length !== 20)
    ) {
      newErrors.bank_rib = "Le RIB doit comporter exactement 20 chiffres.";
    }
    if (newErrors.phone_number) delete newErrors.phone_number;
    console.log('phone' , formData.phone_number.replace(/ /g, ''));

    // Validate phone number length
    if (
      !formData.phone_number.replace(/ /g, '') ||
      formData.phone_number.replace(/ /g, '').length !== 10) {
      newErrors.phone_number =
        "Le numéro de téléphone doit comporter exactement 10 chiffres.";
    }
    if (newErrors.rip) delete newErrors.rip;
    console.log('ripp' , formData.rip.replace(/ /g, ''));

    // Validate RIP length
    if (
      !formData.rip.replace(/ /g, '')||
      formData.rip.replace(/ /g, '').length +"00799999".length !== 20 ) {
      newErrors.rip = "Le RIP doit comporter exactement 20 chiffres.";
    }

    if (newErrors.id_number) delete newErrors.id_number;

    // Validate ID number length
    if (!formData.id_number.replace(/ /g, '')|| formData.id_number.replace(/ /g, '').length !== 18) {
      newErrors.id_number =
        "Le numéro d'identification doit comporter exactement 18 caractères.";
    }
 // retired and retired_at
 if(formData.retired && formData.retired_at ===''){
  newErrors.retired_at  =
  "date de Retirement est requis.";
}
Object.keys(formData).forEach((key) => {
  if (newErrors.key) delete newErrors.key;
  if (!formData[key] && key !== "is_active" && key !== "is_superuser"&& key !== "retired" && key !=='retired_at') {
    newErrors[key] = `${key.replace('_' ,' ')} est requis.`;
  }
});

  
    // Check if any errors occurred
    if (Object.keys(newErrors).length !== 0) {
      setNewErrors(newErrors);
      return;
    }
    let user = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] && typeof formData[key] === 'string') {
        user[key] = formData[key].replace(/ /g, '');
      }
    });
    
    
    try {
      const updateUser = await updateUser({ ...user, rip:"00799999" + user.rip , salary: user.salary.replace(/,/g, '') }, profileRequsted);
    console.log('uuuuuuuuuuuuuu', updateUser);
      if(updateUser){
      window.location.reload()
     }
    } catch (error) {
      if (error.response) {
        console.log("errror", error.data);
        if (error.status === 400) {
          for (const key in error.data) {
            toast.error(error.data[key][0]);
            break;
          }
        }
      } else {
        toast.error("Une erreur s'est produite");
      }
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col  bg-lightgray">
      <div className="px-6 pb-4 flex flex-col flex-grow relative ">
        <div className="flex items-center justify-between">
          <h1 className=" sticky top-[60px] pt-5 pb-6 bg-lightgray text-xl lg:text-2xl text-black font-bold capitalize">
            Remplir les données du nouveau utilisateur
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <div
                onClick={handleEdit}
                className=" bg-light-blue cursor-pointer rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
              >
                <p className="capitalize">Edit</p>
              </div>
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
                  className={`w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.first_name}
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
                  className={` w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.last_name}
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
                  className={` w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.id_number}
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
                  className={`w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.email}
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
                  className={`w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.phone_number}
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
              <div className=" mt-5 flex flex-col gap-1">
                <label className="pb-1" htmlFor="recruted_at">
                date de Recrutement
                  <span
                    style={{ color: "red" }}
                  >
                    {" "}
                    *
                  </span>
                </label>
                {readOnly ? (
                  <input
                    placeholder="date"
                    value={UserProfileData.recruted_at}
                    className={`w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                  />
                ) : 
                <DatePickerDemo
                  id="dateNaissance"
                  name="dateNaissance"
                  value={UserProfileData.recruted_at}
                  input='recruted_at'
                />}
                <p className="text-red-500 text-[11px]  font-light mb-1 h-3">
                  {newErrors?.recruted_at}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="role">
                  Role<span style={{ color: "red" }}> * </span>
                </label>

                {readOnly ? (
                  <input
                    placeholder="Role"
                    className={`w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                    value={UserProfileData.role}
                  />
                ) : (
                  <Select
                    name="role"
                    onValueChange={(value) => {
                      localStorage.setItem(`profile/role`, value);

                      const prev = { ...UserProfileData, ["role"]: value };
                      setProfileUserData(prev);
                    }}
                    value={UserProfileData.role}
                  >
                    <SelectTrigger
                      className={`w-full bg-transparent border-1 ${
                        readOnly ? "border-none" : "border-gray-200"
                      } outline-none h-12 rounded-lg px-4 text-base`}
                      readOnly={readOnly}
                      value={UserProfileData.role}
                    >
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
                )}
                <p className="text-red-500 text-[11px]   font-light mb-1 h-3">
                  {newErrors?.role}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
              {!readOnly &&
                <input
                  id="retired"
                  name="retired"
                  type="checkbox"
                  readOnly={readOnly}
                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  checked={UserProfileData.retired}
                  onChange={(e) =>handleChange(e)}
                />}
                <label htmlFor="retired">
                  Est-il retraité ?
                </label>
                {readOnly && (UserProfileData.retired === 'true'?'Oui':'Non')}
              </div>
          


              { UserProfileData.retired && <div className=" mt-5 flex flex-col gap-1">
                <label htmlFor="retired_at">
                date de Retirement
                  <span
                    style={{ color: "red" }}
                  >
                    {" "}
                    *
                  </span>
                </label>
                {readOnly ? (
                  <input
                    placeholder="date"
                    value={UserProfileData.retired_at}
                    className={`w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                  />
                ) : 
                <DatePickerDemo
                  id="dateNaissance"
                  name="dateNaissance"
                  value={UserProfileData.retired_at}
                  input='retired_at'
                />}
                <p className="text-red-500 text-[11px]  font-light mb-1 h-3">
                  {newErrors?.retired_at}
                </p>
              </div>}


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
                  min="0"
                  className={`w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.salary}
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
                    className={` pl-20 w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                    value={UserProfileData.rip}
                    onChange={(e) => handleChange(e)}
                    style={{
                      borderColor: newErrors?.rip
                        ? "red"
                        : " rgb(229 231 235 / var(--tw-border-opacity))",
                    }}
                  />
                  <p
                    className={`pl-2 absolute top-1/2 left-0 -translate-y-1/2  ${
                      UserProfileData?.rip.length !== 0 ? "" : "text-gray-500"
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
                  className={`w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.bank_rib}
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
                {readOnly ? (
                  <input
                    placeholder="Sexe"
                    className={`w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                    value={UserProfileData.sexe}
                  />
                ) : (
                  <Select
                    value={UserProfileData.sexe}
                    name="sexe"
                    onValueChange={(value) => {
                      localStorage.setItem(`profile/sexe`, value);

                      const prev = { ...UserProfileData, ["sexe"]: value };
                      setProfileUserData(prev);
                    }}
                  >
                    <SelectTrigger
                      className={`w-full bg-transparent border-1 ${
                        readOnly ? "border-none" : "border-gray-200"
                      } outline-none h-12 rounded-lg px-4 text-base`}
                    >
                      <SelectValue placeholder="Choisir le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homme">Homme</SelectItem>
                      <SelectItem value="femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <p className="text-red-500 text-[11px] font-light mb-1 h-3">
                  {newErrors?.sexe}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="martial_situation">
                  Situation Familiale<span style={{ color: "red" }}> * </span>
                </label>
                {readOnly ? (
                  <input
                    placeholder="situation ..."
                    className={`w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                    value={UserProfileData.martial_situation}
                  />
                ) : (
                  <Select
                    value={UserProfileData.martial_situation}
                    onValueChange={(value) => {
                      localStorage.setItem(`profile/martial_situation`, value);
                      const prev = {
                        ...UserProfileData,
                        ["martial_situation"]: value,
                      };
                      setProfileUserData(prev);
                    }}
                  >
                    <SelectTrigger
                      className={`w-full bg-transparent border-1 ${
                        readOnly ? "border-none" : "border-gray-200"
                      } outline-none h-12 rounded-lg px-4 text-base`}
                      readOnly={readOnly}
                      value={UserProfileData.martial_situation}
                    >
                      <SelectValue placeholder="Choisir la situation familiale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marie">Marié(e)</SelectItem>
                      <SelectItem value="divorce">Divorcé(e)</SelectItem>
                      <SelectItem value="celibataire">Célibataire</SelectItem>
                      <SelectItem value="veuf">Veuf(ve)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
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
                  className={`w-full bg-transparent border-1 ${
                    readOnly ? "border-none" : "border-gray-200"
                  } outline-none h-12 rounded-lg px-4 text-base`}
                  readOnly={readOnly}
                  value={UserProfileData.birth_adress}
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
                  <span
                    style={{
                      color: " rgb(229 231 235 / var(--tw-border-opacity))",
                    }}
                  >
                    {" "}
                    *{" "}
                  </span>
                </label>
                {/* Replace DatePickerDemo with your actual component */}
                {readOnly ? (
                  <input
                    placeholder="date"
                    value={UserProfileData.birth_date}
                    className={`w-full bg-transparent border-1 ${
                      readOnly ? "border-none" : "border-gray-200"
                    } outline-none h-12 rounded-lg px-4 text-base`}
                    readOnly={readOnly}
                  />
                ) : (
                  <DatePickerDemo
                    id="dateNaissance"
                    name="dateNaissance"
                    value={UserProfileData.birth_date}
                    input={'birth_date'}
                  />
                )}
                <p className="text-red-500 text-[11px]  font-light mb-1 h-3">
                  {newErrors?.birth_date}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {!readOnly && <div
                onClick={(e) => {
                  handleSubmit(e, UserProfileData);
                }}
                className=" bg-light-blue cursor-pointer rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
              >
                <p className="capitalize">Enregister</p>
              </div>}
             
              {/* <div
                onClick={() => {
                  Object.keys(localStorage).forEach((key) => {
                    if (key.startsWith("profile/")) {
                      localStorage.removeItem(key);
                    }
                  });
                  window.location.reload();
                }}
                className=" border cursor-pointer bg-white border-[#e5e4e4] rounded-lg   px-5 py-2 text-base  lg:px-7  lg:text-lg  "
              >
                <p className="capitalize">Annuler</p>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
