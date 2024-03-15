import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import useStore from "../../store/index";
export function DatePickerDemo() {
  const [date, setDate] = React.useState();
  const {AddUserData , setAddUserData} = useStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[240px]  justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Sélectionner une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate();

            const options = {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            };

            const data = e
              .toLocaleDateString("en-US", options)
              .split("/")
              .reverse()
              .join("-");
            console.log(data);

            const prev = { ...AddUserData, ["birth_date"]: data };
            setAddUserData(prev);
            console.log(AddUserData);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
