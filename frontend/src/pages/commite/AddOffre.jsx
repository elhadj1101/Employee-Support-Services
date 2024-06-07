import React, { useState, useRef, useEffect } from "react";
import FormInput from "../../components/utils/FormInput";
import FileInput from "components/utils/FileInput";
import Axios from "api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useStore from "store";


function AddOffre({edit = false}) {
  const [offre, setOffre] = useState({
    title: "",
    description: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    max_participants: 10,
    cover: null,
  });
  const [filee, setFilee] = useState([])
  const {offres, setOffres} = useStore();
  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  const navigate = useNavigate();
  
  let OffreId = parts[parts.length - 1];
  useEffect (() => {
    if (edit && !OffreId ) {
      toast.warning("Offre non trouvée");
      navigate("/");
      return;
    }
    if (edit && offres.length > 0) {
      const currentOffre = offres.filter((offre) => offre.id === parseInt(OffreId));
      if (currentOffre.length === 0) {
        toast.warning("Offre non trouvée");
        navigate("/");
        return;
      }
      setOffre(currentOffre[0]);
      setFilee([currentOffre[0].cover])
    }

  }, [offres])
  const btnRef = useRef();

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
    if (value !== "") {
      setError((error) => {
        return { ...error, [name]: "" };
      });
    }else {
      setError((error) => {
        return { ...error, [name]: "Ce champ est requis" };
      });
    }
    setOffre({
      ...offre,
      [name]: value,
    });
  };


  const handleSubmit = () => {
    if (offre.title === "") {
      setError((prv) => {
        return { ...prv, title: "Le titre est requis" };
      });
      return;
    }
    if (offre.description === "") {
      setError((prv) => {
        return { ...prv, description: "La description est requise" };
      });
      return;
    }
    if (offre.start_date === "") {
      setError((prv) => {
        return { ...prv, start_date: "La date de debut est requise" };
      });
      return;
    }
    if (offre.end_date === "") {
      setError((prv) => {
        return { ...prv, end_date: "La date de fin est requise" };
      });
      return;
    }
    if (offre.max_participants <= 0) {
      setError((prv) => {
        return {
          ...prv,
          max_participants: "Le nombre de participants est requis",
        };
      });
      return;
    }
    if (offre.cover === null) {
      setError((prv) => {
        return { ...prv, cover: "L'image de couverture est requise" };
      });
      return;
    }

    if (btnRef.current) {
      btnRef.current.disabled = true;
      btnRef.current.classList.remove("cursor-pointer");
      btnRef.current.classList.add("cursor-not-allowed");
    }
    if (edit) {
      Axios.patch(`/offres/${OffreId}/`, offre,{
        headers: {
          "Content-Type": "multipart/form-data",
        }})
        .then((res) => {
          console.log("offre updated");
          toast.success("Offre modifiée avec succès");
          let newOffres = offres.filter((o) => o.id !== parseInt(OffreId));
          newOffres.push(res.data);
          setOffres(newOffres);
          setOffre({...res.data, cover: null});
          if (btnRef.current) {
            btnRef.current.disabled = false;
            btnRef.current.classList.remove("cursor-not-allowed");
            btnRef.current.classList.add("cursor-pointer");
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data){
              if (err.response.status === 500){
                toast.error(
                  "Une erreur s'est produite lors de la modification de l'offre"
                );
              }
              if (err.response.data.detail) {
                toast.error(err.response.data.detail);
              }
              let msg = ""
              let errs = Object.keys(err.response.data)
              errs.forEach((k) => {
                msg = msg + err.response.data[k].join("\n");
              })
              toast.error(msg)
            }else {
              toast.error(
                "Une erreur s'est produite lors de la modification de l'offre"
              );

            }
          }
          if (btnRef.current) {
            btnRef.current.disabled = false;
            btnRef.current.classList.remove("cursor-not-allowed");
            btnRef.current.classList.add("cursor-pointer");
          }
        });
    }else {
      Axios.post("/offres/", offre, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          console.log("offre added");
          toast.success("Offre ajoutée avec succès");
          if (btnRef.current) {
            btnRef.current.disabled = false;
            btnRef.current.classList.remove("cursor-not-allowed");
            btnRef.current.classList.add("cursor-pointer");
          }
          setOffre({
            title: "",
            description: "",
            start_date: new Date().toISOString().split("T")[0],
            end_date: new Date().toISOString().split("T")[0],
            max_participants: 10,
            cover: null,
          });
          setFilee([]);

        })
        .catch((err) => {
          console.log("error");
          toast.error("Erreur lors de l'ajout de l'offre");
          console.log(err);
          if (btnRef.current) {
            btnRef.current.disabled = false;
            btnRef.current.classList.remove("cursor-not-allowed");
            btnRef.current.classList.add("cursor-pointer");
          }
        });
    }
    navigate('/offres');
  }
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          {edit ? `Modifier l'offre (${OffreId})` : "Ajouter une offre"}
        </h1>
      </div>
      <div className="relative w-full bg-white p-4 lg:p-6 rounded-lg  overflow-auto">
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
              <FileInput
                labell="Ajouter une image de couverture"
                oldFiles={
                  typeof(offre.cover) ==="string"
                    ? [
                        {
                          url: offre?.cover?.replaceAll(
                            "http://localhost:8000",
                            ""
                          ),
                          name:offre.cover?.split("/")[
                            offre.cover?.split("/").length - 1
                          ],
                          size: 250,
                        },
                      ]
                    : []
                }
                setOldFiles={() => {}}
                setSingleFile={(file) => {
                  setOffre((prv) => {
                    return { ...prv, cover: file };
                  });
                  setFilee([file])
                }}
                files={filee}
                accepts="image/*"
                maxFiles={1}
                fileTypes={["PNG", "JPG", "JPEG"]}
                multpl={false}
                iconSrc="/icons/png.png"
              />
              {error.cover && (
                <p className="mt-2 text-sm text-red-600 ">{error.cover}</p>
              )}
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
              <FormInput
                name={"max_participants"}
                type={"number"}
                inputLabel={"Nombre maximale de participants"}
                placeholder={"Nombre maximale de participants"}
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
                inputClassName={"h-[220px] mt-4"}
                error={error.description !== ""}
                errMsg={error.description}
                handleValueChange={handleInputChange}
              />
            </div>
          </form>
          <button
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className=" bg-light-blue cursor-pointer rounded-lg mt-6  px-5 py-2 text-base  lg:px-7  lg:text-lg text-white  "
          >
            Enregister
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOffre;
