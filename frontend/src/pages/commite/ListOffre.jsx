import React, {useState} from 'react'
import useStore from 'store';
import {Button} from 'components/ui/button';
import { Link } from 'react-router-dom';
import { FaClock } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import FormInput from 'components/utils/FormInput';
import { FaSearch } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";



function ListOffre() {
  const {offres } = useStore();
  const [searchedKeyword, setSearchedKeyword] = useState("");
  return (
    <div className="w-full h-full px-6 pb-4 flex-grow flex flex-col  bg-lightgray">
      <div className="flex items-center justify-between">
        <h1 className=" sticky top-[60px] pt-5 pb-6 text-xl lg:text-2xl text-black font-bold capitalize">
          Liste des offres
        </h1>
        <div className="flex relative items-center  basis-1/3">
          <FormInput
            name={"searchedKeyword"}
            type={"text"}
            label={false}
            placeholder={"Titre De l'offre a chercher "}
            value={searchedKeyword}
            error={false}
            errMsg={""}
            containerClassname="w-full"
            inputClassName="bg-white w-full"
            handleValueChange={(e) =>
              setSearchedKeyword(e.target.value.toLowerCase())
            }
          />
          <FaSearch className="-ml-[30px]" />
        </div>
      </div>
      <div className=" w-full rounded-lg no-scrollbar overflow-auto flex flex-col items-center justify-start gap-3">
        {offres
          ?.filter((offre) =>
            offre.title.toLowerCase().includes(searchedKeyword)
          )
          .map((offre, i) => (
            // <div className="bg-light-blue w-ful h-full mb-5 rounded-md flex flex-wrap md:flex-nowrap justify-between items-center">
            //   <div className="text-white basis-full h-full px-7 py-5 md:basis-3/5 lg:basis-2/3 gap-4 flex flex-col justify-center  ">
            //     <div className="text-3xl font-bold">
            //       {offre.title.toUpperCase()}
            //     </div>
            //     <div className="font-medium text-md">
            //       {offre.description?.slice(0, 250) +
            //         (offre.description?.length > 250 ? "..." : "")}
            //     </div>
            //     <div>
            //       <Button
            //         asChild
            //         className="font-semibold mt-4 bg-white hover:text-blue-950 text-blue-950 hover:bg-white "
            //       >
            //         <Link to={`/offres/${offre.id}`}>Savoir plus</Link>
            //       </Button>
            //     </div>
            //   </div>
            //   <div className="flex items-center justify-center bg-light-blue basis-full md:basis-2/5 xl:basis-1/3 h-full rounded-r-xl overflow-hidden rounded-br-xl">
            //     <img
            //       className="h-[83%] w-[90%] rounded-md object-cover "
            //       src={offre.cover}
            //       alt=""
            //     />
            //   </div>
            // </div>
            <div key={i} className="flex bg-white  items-start justify-between gap-10 p-[25px]">
              <div className="basis-3/4 flex  justify-center flex-col gap-3">
                <div className="text-3xl font-bold text-darkblue">
                  {offre?.title}
                </div>
                <div className="text-sm flex gap-4 items-center text-light-blue font-semibold ">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex gap-2 items-center cursor-pointer">
                          <span className=" text-darkblue">
                            <FaClock />
                          </span>
                          {offre?.published_at}
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
                          {offre?.max_participants}
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
                        {offre?.start_date}
                      </span>{" "}
                      et se termine le{" "}
                      <span className="text-light-blue">{offre?.end_date}</span>
                    </span>
                  </p>
                </div>
                <div>
                  {offre.description?.slice(0, 150) +
                    (offre.description?.length > 150 ? "..." : "")}
                </div>
                <div>
                  <Button asChild className="mt-2 ">
                    <Link to={`/edit-offre/${offre.id}`}>Modifier</Link>
                  </Button>
                </div>
              </div>
              <div className="basis-1/4 sticky top-0">
                <img
                  className="w-full rounded-md object-cover "
                  src={offre.cover}
                  alt=""
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListOffre