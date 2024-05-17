import React, { useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SingleMeeting from "./SingleMeeting";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "components/ui/dialog";
import FileUploaded from "components/FileUploaded";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdCheck, MdDelete } from "react-icons/md";
import useStore from "store";
import { toast } from "sonner";
import Axios from "../../api/axios";
import FileInput from "components/utils/FileInput";
function MeetingsCalendar({ meetings, refresh }) {
  const { user } = useStore();
  const [formatedMeetings, setFormatedMeetings] = useState([]);
  const [showPopup, setShowPopup] = useState(-1);
  const [open, setOpen] = useState(false);
  const formatTime = (time) => {
    return time.split(":")[0] + ":" + time.split(":")[1];
  };
  const openBtn = useRef();

  const handleEventClick = (event) => {
    console.log(event);
    setShowPopup(event.data.meeting);
    openBtn.current?.click();
  };
  moment.locale("fr");
  moment.updateLocale("fr", {
    week: {
      dow: 0,
    },
  });
  const views = [Views.MONTH, Views.AGENDA];
  const localizer = momentLocalizer(moment);
  const today = moment().toDate();

  const messages = {
    week: "La semaine",
    work_week: "Semaine de travail",
    day: "Jour",
    month: "Mois",
    previous: "Antérieur",
    next: "Prochain",
    today: `Aujourd'hui`,
    agenda: "Ordre du jour",

    showMore: (total) => `+${total} plus`,
  };

  const components = {
    month: {
      event: ({ event }) => {
        const data = event?.data;
        if (data?.meeting)
          return <SingleMeeting meeting={data?.meeting} month={true} />;

        return null;
      },
    },
  };

  useEffect(() => {
    let kk = meetings.map((meeting) => {
      return {
        id: meeting.id,
        title: <SingleMeeting meeting={meeting} />,
        start: moment(meeting.day)
          .add(meeting.start_time.split(":")[0], "hours")
          .add(meeting.start_time.split(":")[1], "minutes")
          .toDate(),
        end: moment(meeting.day)
          .add(meeting.end_time.split(":")[0], "hours")
          .add(meeting.end_time.split(":")[1], "minutes")
          .toDate(),
        data: {
          meeting,
        },
      };
    });
    kk.push({
      id: 52,
      title: <p>meeting.title</p>,

      start: new Date(2024, 5, 16),
      end: new Date(2024, 5, 16),
    });
    console.log(kk);
    setFormatedMeetings(kk);
  }, [meetings]);
  const deleteMeeting = (id, e) => {
    e.preventDefault();

    Axios.delete(`/meetings/${id}`)
      .then(async () => {
        toast.success("La réunion a été supprimée avec succès.");
        await refresh();
        setOpen(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data?.detail) {
            toast.error(err.response.data.detail);
          }
        }
        toast.error(
          "Une erreur s'est produite lors de la suppression de la réunion."
        );
        console.log(err);
      });
  };

  const fileInputRef = useRef(null);

  const handleUploadPv = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {

      console.log(file);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await Axios.patch(`/meetings/${showPopup.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="p-5 h-screen">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button ref={openBtn} hidden></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {showPopup !== -1 && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Reunion ({showPopup.id}) : {showPopup.title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div>
                  {(user?.role === "president" ||
                    user?.role === "vice_president") && (
                    <div className="flex items-center  w-fit gap-2 ml-auto">
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                     
                      <MdCheck
                        size={20}
                        className="cursor-pointer text-green-500 hover:text-white hover:bg-green-600 w-7 h-7 p-1 rounded-full"
                        onClick={handleUploadPv}
                      />

                      <MdDelete
                        onClick={(e) => deleteMeeting(showPopup.id, e)}
                        size={20}
                        className="cursor-pointer text-red-500 hover:text-white  hover:bg-red-600 w-7 h-7 p-1 rounded-full"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-start gap-2 ">
                    <p className="text-lg">
                      {formatTime(showPopup.start_time)} -{" "}
                      {formatTime(showPopup.end_time)}{" "}
                    </p>
                    {showPopup?.link && (
                      <p className="text-green-500 capitalize font-semibold flex items-center">
                        <div className="w-[6px] h-[6px] bg-green-500 rounded-full mr-[2px]" />
                        online
                      </p>
                    )}
                    {!showPopup?.link && (
                      <p className="text-light-blue  capitalize font-semibold flex items-center">
                        <div className="w-[6px] h-[6px] bg-light-blue rounded-full mr-[2px]" />{" "}
                        Presentiel
                      </p>
                    )}
                  </div>
                  <p className=" text-sm text-gray-500 flex items-center gap-1">
                    {showPopup?.link && (
                      <>
                        <p className="font-semibold">Lien:</p>
                        <span className="text-black"> {showPopup?.link}</span>
                        <a href={showPopup?.link}>
                          <FaExternalLinkAlt
                            className="cursor-pointer "
                            size={12}
                          />
                        </a>
                      </>
                    )}
                  </p>
                  <h2 className="mt-2  font-semibold">description</h2>
                  <p className="text-sm ml-1">{showPopup.description}</p>
                  {showPopup.pv && (
                    <>
                      <p className="mb-2">Le Pv: </p>
                      <FileUploaded
                        name={
                          showPopup.pv?.split("/")[
                            showPopup.pv?.split("/").length - 1
                          ]
                        }
                        size={showPopup.size}
                        fileLink={showPopup.pv}
                      />
                    </>
                  )}
                </div>
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button">Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Calendar
        culture="fr"
        // showMultiDayTimes
        onSelectEvent={handleEventClick}
        messages={messages}
        events={formatedMeetings}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        defaultDate={today}
        components={components}
        views={views}
      />
    </div>
  );
}

export default MeetingsCalendar;
