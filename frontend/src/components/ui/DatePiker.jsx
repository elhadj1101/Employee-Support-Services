import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import useStore from "../../store/index";
export function DatePickerDemo({input}) {
  const { AddUserData, setAddUserData } = useStore();
  const [selectedDate, setSelectedDate] = React.useState();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[240px]  justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Sélectionner une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(e) => {
            if(e){
              const options = {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              };
  
              const formattedDate = e
                .toLocaleDateString("en-US", options)
                .split("/")
                .reverse()
                
                const date = formattedDate[0] + '-'+ formattedDate[2] + '-'+ formattedDate[1] 
                console.log(e);
              localStorage.setItem(`form/${input}`, date);
              const updatedUserData = { ...AddUserData, [input]: date }; 
              setAddUserData(updatedUserData);
  
              setSelectedDate(e); // Update the selectedDate state with the Date object
            }
           
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

