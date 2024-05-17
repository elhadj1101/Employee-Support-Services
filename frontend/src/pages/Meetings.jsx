import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { addMeeting, getMeetings } from "api/meetings";
import { GoPlus } from "react-icons/go";
import useStore from "store";
import { Input } from "components/ui/input";
import { DatePickerMeetings } from "components/ui/DatePikerMeetings";
import MeetingsCalendar from "components/employee/MeetingsCalendar";
import { Button } from "components/ui/button";
export default function Meetings() {
  const { Meetings, user, setMeetings } = useStore();
  const [date, setDate] = useState();
  const [hourStart, setHourStart] = useState();
  const [minuteStart, setMinuteStart] = useState();
  const [hourEnd, setHourEnd] = useState();
  const [minuteEnd, setMinuteEnd] = useState();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState(null);
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const refresh = async () => {
    try {
      const meetingsData = await getMeetings();
      setMeetings(meetingsData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  const HandleOpen = () => {
    if (open) {
      setDate();
      setHourStart();
      setMinuteStart();
      setHourEnd();
      setMinuteEnd();
      setDescription();
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleSubmit = async () => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .split("/")
      .reverse();

    console.log(
      title,
      formattedDate[0] + "-" + formattedDate[2] + "-" + formattedDate[1],
      `${hourStart}:${minuteStart < 10 ? "0" : ""}${minuteStart}`,
      `${hourEnd}:${minuteEnd < 10 ? "0" : ""}${minuteEnd}`,
      description
    );
    addMeeting({
      title,
      day: formattedDate[0] + "-" + formattedDate[2] + "-" + formattedDate[1],
      start_time: `${hourStart}:${minuteStart < 10 ? "0" : ""}${minuteStart}`,
      end_time: `${hourEnd}:${minuteEnd < 10 ? "0" : ""}${minuteEnd}`,
      description,
      link,
    } ,HandleOpen , refresh);
  };
  const firstMinuteInputRef = useRef(null);
  const secondMinuteInputRef = useRef(null);
  const secondHourInputRef = useRef(null);

  return (
    <div className="flex-grow flex flex-col  h-full  bg-lightgray p-6">
      {(user?.role === "president" || user?.role === "vice_president") && (
        <Dialog open={open} onOpenChange={HandleOpen}>
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
                      value={title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setTitle(title);
                      }}
                      className="placeholder:text-slate-500 disabled:opacity-50 "
                    />
                    <h2 className="mt-5 mb-2">date</h2>
                    <DatePickerMeetings
                      className="placeholder:text-slate-500  "
                      selectedDate={date}
                      setSelectedDate={setDate}
                    />

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="mt-5 mb-2">temp début</h2>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Input
                              type="number" // Change type to text to allow custom handling of input
                              value={hourStart}
                              onChange={(e) => {
                                let input = e.target.value;
                                let numericValue = parseInt(
                                  input.replace(/\D/g, ""),
                                  10
                                );

                                // Remove non-numeric characters and parse as integer
                                if (input === "") {
                                  setHourStart(numericValue);
                                } else if (
                                  !isNaN(numericValue) &&
                                  numericValue <= 23
                                ) {
                                  // Remove leading zeros when the number is greater than 0
                                  input = numericValue.toString(); // Convert numericValue back to string
                                  if (
                                    numericValue > 0 &&
                                    input.startsWith("0")
                                  ) {
                                    input = input.replace(/^0+/, "");
                                    numericValue = parseInt(input, 10); // Parse again to update numericValue
                                  }

                                  setHourStart(numericValue);
                                }
                                if (input.length === 2) {
                                  firstMinuteInputRef.current.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                // Allow only numbers, backspace, delete, and arrow keys
                                if (
                                  !/[\d\b]|Delete|Backspace|ArrowLeft|ArrowRight/.test(
                                    e.key
                                  )
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="Heur"
                              className="placeholder:text-slate-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Input
                              type="number" // Change type to text to allow custom handling of input
                              value={minuteStart}
                              ref={firstMinuteInputRef}
                              onChange={(e) => {
                                let input = e.target.value;
                                let numericValue = parseInt(
                                  input.replace(/\D/g, ""),
                                  10
                                ); // Remove non-numeric characters and parse as integer
                                if (input === "") {
                                  setHourStart(numericValue);
                                } else if (
                                  !isNaN(numericValue) &&
                                  numericValue <= 59
                                ) {
                                  // Remove leading zeros when the number is greater than 0
                                  input = numericValue.toString(); // Convert numericValue back to string
                                  if (
                                    numericValue > 0 &&
                                    input.startsWith("0")
                                  ) {
                                    input = input.replace(/^0+/, "");
                                    numericValue = parseInt(input, 10); // Parse again to update numericValue
                                  }
                                  setMinuteStart(numericValue);
                                }
                                if (input.length === 2) {
                                  secondHourInputRef.current.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                // Allow only numbers, backspace, delete, and arrow keys
                                if (
                                  !/[\d\b]|Delete|Backspace|ArrowLeft|ArrowRight/.test(
                                    e.key
                                  )
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="Minute"
                              className="placeholder:text-slate-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="mt-5 mb-2 ">temp fin</h2>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Input
                              type="text" // Change type to text to allow custom handling of input
                              value={hourEnd}
                              ref={secondHourInputRef}
                              onChange={(e) => {
                                let input = e.target.value;
                                let numericValue = parseInt(
                                  input.replace(/\D/g, ""),
                                  10
                                );
                                // Remove non-numeric characters and parse as integer
                                if (input === "") {
                                  setHourStart(numericValue);
                                } else if (
                                  !isNaN(numericValue) &&
                                  numericValue <= 23
                                ) {
                                  // Remove leading zeros when the number is greater than 0
                                  input = numericValue.toString(); // Convert numericValue back to string
                                  if (
                                    numericValue > 0 &&
                                    input.startsWith("0")
                                  ) {
                                    input = input.replace(/^0+/, "");
                                    numericValue = parseInt(input, 10); // Parse again to update numericValue
                                  }
                                  setHourEnd(numericValue);
                                }
                                if (input.length === 2) {
                                  secondMinuteInputRef.current.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                // Allow only numbers, backspace, delete, and arrow keys
                                if (
                                  !/[\d\b]|Delete|Backspace|ArrowLeft|ArrowRight/.test(
                                    e.key
                                  )
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="Heur"
                              className="placeholder:text-slate-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Input
                              type="number" // Change type to text to allow custom handling of input
                              value={minuteEnd}
                              ref={secondMinuteInputRef}
                              onChange={(e) => {
                                let input = e.target.value;
                                let numericValue = parseInt(
                                  input.replace(/\D/g, ""),
                                  10
                                ); // Remove non-numeric characters and parse as integer
                                if (input === "") {
                                  setHourStart(numericValue);
                                } else if (
                                  !isNaN(numericValue) &&
                                  numericValue <= 59
                                ) {
                                  // Remove leading zeros when the number is greater than 0
                                  input = numericValue.toString(); // Convert numericValue back to string
                                  if (
                                    numericValue > 0 &&
                                    input.startsWith("0")
                                  ) {
                                    input = input.replace(/^0+/, "");
                                    numericValue = parseInt(input, 10); // Parse again to update numericValue
                                  }
                                  setMinuteEnd(numericValue);
                                }
                              }}
                              onKeyDown={(e) => {
                                // Allow only numbers, backspace, delete, and arrow keys
                                if (
                                  !/[\d\b]|Delete|Backspace|ArrowLeft|ArrowRight/.test(
                                    e.key
                                  )
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              placeholder="Minute"
                              className="placeholder:text-slate-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5  flex gap-2 items-center justify-start">
                      <Input
                        type="checkbox"
                        value={online}
                        onChange={(e) => setOnline(e.target.checked)}
                        className="w-4 h-4  "
                      />
                      <h2 className=" ">Online</h2>
                    </div>

                    <h2 className={`mt-4 mb-2 ${online ? "" : "opacity-50"} `}>
                      Lien
                    </h2>
                    <Input
                      type="text"
                      placeholder="ex:  https://google.meet...."
                      value={link}
                      disabled={!online}
                      onChange={(e) => {
                        const link = e.target.value;
                        setLink(link);
                      }}
                      className="placeholder:text-slate-500 disabled:opacity-50 "
                    />
                    <h2 className="mt-5 mb-2">Description</h2>
                    <textarea
                      className="placeholder:text-slate-500 outline-none focus:outline-none resize-none w-full shadow-sm   max-h-20 h-20 border border-gray-200  rounded-md  p-2    "
                      type="text"
                      placeholder="Décriver qulque chose ....."
                      value={description}
                      onChange={(e) => {
                        const text = e.target.value;
                        setDescription(text);
                      }}
                    />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={(e) => handleSubmit(e)}>Enregistrer</Button>

              <DialogClose>
                <Button onClick={HandleOpen}>Annuler</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <MeetingsCalendar meetings={Meetings}  refresh={refresh}/>
      {/* <div className="mt-4 w-full gap-3 flex flex-wrap ">
        {Meetings?.length !== 0 ? (
          Meetings?.map((meeting, index) => (
            <MeetingCard key={index} meeting={meeting} refresh={refresh} />
          ))
        ) : (
          <p>Il ya pas des reunion maintenant...</p>
        )}
      </div> */}
    </div>
  );
}
