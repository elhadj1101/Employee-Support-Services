import React, { useEffect, useState } from "react";
import useStore from "store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaClock } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { Button } from "components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";



function SingleOffre() {
  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  let OffreId = parts[parts.length - 1];
  const { offres, user } = useStore();
  const [requestedOffre, setReqeustedOffre] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (offres.length > 0) {
      if (!OffreId) {
        toast.warning("Offre non trouvée");
        navigate("/");
        return;
      }
      const offre = offres.filter((offre) => offre.id === parseInt(OffreId));
      if (offre.length === 0) {
        toast.warning("Offre non trouvée");
        navigate("/");
        return;
      }
      setReqeustedOffre(offre[0]);
    }
  }, [offres]);
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Details de l'offre (ID: {OffreId})
        </h1>
        {(user?.role === "president" || user?.role === "vice_president") && (
          <div>
            <Button
              className="flex items-center gap-1 ml-auto cursor-pointer text-left  px-4 py-2 text-sm transition-colors bg-light-blue hover:bg-light-blue hover:text-white text-white rounded-md active:scale-95"
              variant="outline"
            >
              Modifier
            </Button>
          </div>
        )}
      </div>
      <div className="relative w-full bg-white p-4 lg:p-6 rounded-lg  overflow-auto">
        {/* show details of the offre (cover , title , start_date, end_date, max_participants, description) */}
        <div className="flex  items-start justify-between gap-5">
          <div className="basis-2/3 flex flex-col gap-3">
            <div className="text-3xl font-bold text-darkblue">
              {requestedOffre?.title}
            </div>
            <div className="text-sm flex gap-4 items-center text-light-blue font-semibold ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <span className=" text-darkblue">
                        <FaClock />
                      </span>
                      {requestedOffre?.published_at}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Date du publication</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <span className="font-semibold text-darkblue">
                        <MdPeopleAlt />
                      </span>
                      {requestedOffre?.max_participants}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nombre Max des applicants</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-sm">
              <p>
                <span className="font-semibold">
                  La Reception des demandes commence le:{" "}
                  <span className="text-light-blue">
                    {requestedOffre?.start_date}
                  </span>{" "}
                  et se termine le{" "}
                  <span className="text-light-blue">
                    {requestedOffre?.end_date}
                  </span>
                </span>
              </p>
            </div>
            <div>{requestedOffre?.description}</div>
          </div>
          <div className="basis-1/3 sticky top-0">
            <img
              className="w-full rounded-md object-cover "
              src={requestedOffre.cover}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOffre;
