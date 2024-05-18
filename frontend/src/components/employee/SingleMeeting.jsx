import React from 'react'
import { formatTime } from "components/utils/utilFunctions";



function SingleMeeting({
    meeting,
    month = false
}) {
  return (
    <div className="w-full">
      {month ? (
        <div className="w-full">
          <div>
            <p className="text-md">{meeting.title}</p>
            <p className="text-sm">
              {formatTime(meeting.start_time)} - {formatTime(meeting.end_time)}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-50px ">
          <p className="text-md font-bold">{meeting.title}</p>
          <p className="text-sm">{meeting.description}</p>
        </div>
      )}
    </div>
  );
}

export default SingleMeeting