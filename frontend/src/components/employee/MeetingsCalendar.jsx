import React, { useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/fr';
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
  DialogClose
} from "components/ui/dialog";
import FileUploaded from "components/FileUploaded";


function MeetingsCalendar({meetings}) {
  const [formatedMeetings, setFormatedMeetings] = useState([]);
  const  [showPopup, setShowPopup] = useState(-1);
  const formatTime = (time) => {
    return time.split(":")[0] + ":" + time.split(":")[1];
  }
  const openBtn = useRef();

  const handleEventClick = (event) =>  {
    
    console.log(event)
    setShowPopup(event.data.meeting)
    openBtn.current?.click()
  };
  moment.locale("fr");
  moment.updateLocale("fr", {
    week: {
      dow: 0  ,
    },
  });
  const views = [Views.MONTH, Views.AGENDA]
  const localizer = momentLocalizer(moment);
  const today = moment().toDate();
 
  const messages  = {
        week: "La semaine",
        work_week: "Semaine de travail",
        day: "Jour",
        month: "Mois",
        previous: "Antérieur",
        next: "Prochain",
        today: `Aujourd'hui`,
        agenda: "Ordre du jour",

        showMore: (total) => `+${total} plus`,
      }
  

  const components = {
    month: {
      event: ({ event }) => {
        const data = event?.data;
        if (data?.meeting) return <SingleMeeting meeting={data?.meeting} month={true}/>;

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
  return (
    <div className="p-5 h-screen">
      <Dialog>
        <DialogTrigger asChild>
          <button ref={openBtn} hidden>
            Edit Profile
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {showPopup !== -1 && (
            <>
              <DialogHeader>
                <DialogTitle>Reunion ({showPopup.id}) : {showPopup.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div>
                  <p className="text-sm">
                    {formatTime(showPopup.start_time)} -{" "}
                    {formatTime(showPopup.end_time)}
                  </p>
                  <p className="text-sm">{showPopup.description}</p>
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

export default MeetingsCalendar
