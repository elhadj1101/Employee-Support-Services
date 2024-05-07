import MeetingCard from "components/MeetingCard";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../components/ui/dialog";
import { GoPlus } from "react-icons/go";
export default function Meetings() {
  return (
    <div className="flex-grow flex flex-col h-full  bg-lightgray p-6">
      <Dialog>
        <DialogTrigger>
          <button className="flex items-center gap-1 ml-auto cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors bg-light-blue text-white rounded-md active:scale-95">
            Ajouter Reunions
            <GoPlus size={15} className="mt-[2px]" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter Un Reunions</DialogTitle>
            <DialogDescription>
              {/* <div className="flex flex-col">
                        <h2 className="mt-5 text-base">Type</h2>
                        <span className="text-sm capitalize text-gray-800 font-semibold">
                          {" "}
                          {row.original.type}
                        </span>
                        <h2 className="mt-5 text-base">
                          Date de Enregistrement
                        </h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          {" "}
                          {row.original.created_at}
                        </p>
                        <h2 className="mt-5 text-base flex gap-2 items-center">
                          la demande correspondant à l'enregistrement.
                          <Link to="">
                            {" "}
                            <FaExternalLinkAlt
                              size={15}
                              className=" transition-all  cursor-pointer   hover:text-gray-600 bg-white"
                            />
                          </Link>
                        </h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          #
                          {row.original.loan?.id ||
                            row.original.finaincial_aid?.id}{" "}
                          {row.original.loan?.employee ||
                            row.original.finaincial_aid?.employee}{" "}
                          {row.original.loan?.amount ||
                            row.original.finaincial_aid?.amount}{" "}
                          da
                        </p>
                        <h2 className="mt-5  text-base">Montant</h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          {" "}
                          {row.original.amount} da
                        </p>
                        <h2 className="mt-5  text-base">Motif</h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          {row.original.motif}
                        </p>
                      </div> */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <DialogClose>
                          <DeleteButton id={row.original.id} />
                        </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mt-4 w-[90%] mx-auto">
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
        <MeetingCard />
      </div>
    </div>
  );
}
