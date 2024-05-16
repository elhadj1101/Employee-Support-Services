import React, { useState, useEffect } from 'react';
import MeetingCard from "components/MeetingCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
function MeetingsCalendar({meetings}) {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Currently selected date


  const handlePreviousMonth = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getMonth() + 1))
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getMeetingsForDate = (date) => {
    return meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      return (
        meetingDate.getDate() === date.getDate() &&
        meetingDate.getMonth() === date.getMonth() &&
        meetingDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePreviousMonth}>
          <FaChevronLeft className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
        <div className="flex items-center">
          {/* <CalendarIcon className="h-6 w-6 text-blue-500 mr-2" /> */}
          <span className="text-xl font-medium">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <button onClick={handleNextMonth}>
          <FaChevronRight className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {/* Days of the week */}
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Sun</span>
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Mon</span>
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Tue</span>
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Wed</span>
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Thu</span>
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Fri</span>
        <span className="text-xs font-bold px-2 py-1 text-gray-500">Sat</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {/* Loop through days of the month */}
        {new Array(selectedDate.getDate()).fill(0).map((_, i) => {
          const day = i + 1;
          const date = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            day
          );
          const meetingsForDay = getMeetingsForDate(date);

          return (
            <div
              key={date.getTime()}
              className="px-2 py-1 border rounded-md hover:bg-gray-200"
            >
              {/* Check if it's the current date for highlighting */}
              {day === new Date().getDate() && (
                <span className="inline-block p-1 rounded-full bg-blue-500 text-white text-xs font-bold">
                  {day}
                </span>
              )}
              {day !== selectedDate.getDate() && (
                <span className="text-xs">{day}</span>
              )}
              {/* Render meeting cards below the date */}
              {meetingsForDay.length > 0 && (
                <div className="mt-2">
                  {meetingsForDay.map((meeting, index) => {
                    return <MeetingCard key={index} meeting={meeting} />;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeetingsCalendar;
