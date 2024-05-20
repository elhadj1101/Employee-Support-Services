import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function ComboBox({
  newRecord,
  loans,
  aids,
  demmandeSelecter,
  handleComboBox,
  error,
}) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen} className="w-full   ">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-2 p-4 h-10 justify-between w-full  "
          style={{ borderColor: error ? "red" : "" }}
        >
          {(demmandeSelecter?.id && (
            <div className="w-full flex gap-2 items-center">
              <p># {demmandeSelecter?.id} </p>
              <p>
                {" "}
                {demmandeSelecter?.employee?.email ||
                  demmandeSelecter?.employee?.email}{" "}
              </p>
              <p className="ml-auto">{demmandeSelecter?.amount} da</p>
              {demmandeSelecter?.paid_amount && (
                <>({demmandeSelecter?.paid_amount})</>
              )}
            </div>
          )) ||
            "Select demmande..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[440px] mt-1 p-0">
        <Command>
          <CommandInput placeholder="search..." />
          <CommandList>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            {loans.length !== 0 ? (
              <CommandGroup heading="Prets">
                {loans
                  .filter(
                    (pret) =>
                      (pret.loan_status === "approved" &&
                        newRecord.type === "expense") ||
                      (pret.loan_status === "payment_started" &&
                        newRecord.type === "income")
                  )
                  .map((demmande) => (
                    <CommandItem
                      key={demmande.id}
                      value={demmande.id}
                      onSelect={(currentValue) => {
                        handleComboBox(currentValue, demmande, "loan");
                        setOpen(false);
                      }}
                    >
                      <div className="w-full flex gap-2 items-center">
                        {/* !!!!!!!! the space after the id is very important !!!!!!!! */}
                        <p>#{demmande?.id} </p>
                        <p>
                          {" "}
                          {demmande?.employee?.email ||
                            demmande?.employee?.email}
                        </p>
                        <p className="ml-auto">
                          {demmande?.amount} da ({demmande?.paid_amount} )
                        </p>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          demmandeSelecter.id === demmande.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            ) : (
              ""
            )}
            {newRecord.type !== "income" && aids.length !== 0 ? (
              <CommandGroup heading="Aids">
                {aids
                  .filter((aid) => aid.financial_aid_status === "approved")
                  .map((demmande) => (
                    <CommandItem
                      key={demmande.id}
                      value={demmande.id}
                      onSelect={(currentValue) => {
                        handleComboBox(currentValue, demmande, "financial_aid");
                        setOpen(false);
                      }}
                    >
                      <div className="w-full flex gap-2 items-center">
                        {/* !!!!!!!! the space after the id is very important !!!!!!!! */}
                        <p>#{demmande?.id} </p>
                        <p>
                          {" "}
                          {demmande?.employee?.email ||
                            demmande?.employee?.email}{" "}
                        </p>
                        <p className="ml-auto">{demmande?.amount} da</p>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          demmandeSelecter.id === demmande.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            ) : (
              ""
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
