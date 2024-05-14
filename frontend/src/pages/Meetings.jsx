import MeetingCard from "components/MeetingCard";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { getMeetings } from "api/meetings";
import { GoPlus } from "react-icons/go";
import useStore from "store";
import { Input } from "components/ui/input";
import { DatePickerMeetings } from "components/ui/DatePikerMeetings";

export default function Meetings() {
  const { Meetings, setMeetings } = useStore();
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const meetingsData = await getMeetings();
        setMeetings(meetingsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="flex-grow flex flex-col  h-full  bg-lightgray p-6">
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
              <div className="p-3">
                <div className="flex flex-col">
                  <h2 className="mt-5 mb-2">
                    Title
                    <span className="text-red-600 ml-1">*</span>
                  </h2>
                  <Input
                    type="text"
                    placeholder="objective ..."
                    value={""}
                    className="placeholder:text-slate-500 disabled:opacity-50 "
                  />
                  <h2 className="mt-5 mb-2">date</h2>
                  <DatePickerMeetings
                    className="placeholder:text-slate-500  "
                    date={date}
                    setDate={setDate}
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="mt-5 mb-2">temp début</h2>
                    </div>

                    <div>
                      <h2 className="mt-5 mb-2 ">temp fin</h2>
                      <Input
                        type="number"
                        placeholder="100000"
                        value={""}
                        className="placeholder:text-slate-500 disabled:opacity-50 "
                      />
                    </div>
                  </div>
                  <h2 className="mt-5 mb-2">Description</h2>
                  <textarea
                    className="placeholder:text-slate-500 outline-none focus:outline-none resize-none w-full shadow-sm   max-h-20 h-20 border border-gray-200  rounded-md  p-2    "
                    type="text"
                    placeholder="Décriver qulque chose ....."
                    value={""}
                    // onChange={}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>{/* Your content here */}</DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mt-4 w-full mx-auto h-full overflow-y-auto">
        {Meetings?.map((meeting, index) => (
          <MeetingCard key={index} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
