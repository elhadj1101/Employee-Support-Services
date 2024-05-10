import React, { useState } from "react";
import FormInput from "../../components/utils/FormInput";
import FileInput from "components/utils/FileInput";


function AddOffre() {
  const [offre, setOffre] = useState({
    title: "",
    description: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    max_participants: 10,
    cover: null,
  });

  const [error, setError] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    max_participants: "",
    cover: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setOffre({
      ...offre,
      [name]: value,
    });
  };
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Creer Un Offre
        </h1>
      </div>
      <div className=" relative w-full bg-white p-4 lg:p-6 rounded-lg  overflow-auto">
        <div className="w-full">
          <form className="w-full flex gap-3">
            <div className="basis-1/2 flex-col flex gap-4">
              <FormInput
                name={"start_date"}
                type={"date"}
                inputLabel={"Date Debut de l'offre"}
                placeholder={"Titre"}
                value={offre.start_date}
                error={error.start_date !== ""}
                errMsg={error.start_date}
                handleValueChange={handleInputChange}
              />
              <FormInput
                name={"title"}
                type={"text"}
                inputLabel={"Titre De l'offre"}
                placeholder={"Titre De l'offre"}
                value={offre.title}
                error={error.title !== ""}
                errMsg={error.title}
                handleValueChange={handleInputChange}
              />
              <FormInput
                name={"max_participants"}
                type={"number"}
                inputLabel={"Titre De l'offre"}
                placeholder={"Titre De l'offre"}
                value={offre.max_participants}
                error={error.max_participants !== ""}
                errMsg={error.max_participants}
                handleValueChange={handleInputChange}
              />
              <FormInput
                name={"description"}
                type={"text"}
                isTextarea={true}
                inputLabel={"Description De l'offre"}
                placeholder={"Ecrivez les details de l'offre ici..."}
                value={offre.description}
                error={error.description !== ""}
                errMsg={error.description}
                handleValueChange={handleInputChange}
              />
            </div>
            <div className="basis-1/2 flex-col flex gap-4">
              <FormInput
                name={"end_date"}
                type={"date"}
                inputLabel={"Date Fin de l'offre"}
                placeholder={"Date Fin de l'offre"}
                value={offre.end_date}
                error={error.end_date !== ""}
                errMsg={error.end_date}
                handleValueChange={handleInputChange}
              />
              <FileInput labell="Ajouter une image de couverture" 
              />
            </div>
          </form>
          <div
            onClick={(e) => {
              e.preventDefault();
            }}
            className=" bg-light-blue cursor-pointer rounded-lg mt-6  px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
          >
            <p className="capitalize">Enregister</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOffre;
