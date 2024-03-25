import * as React from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { statusColorMap } from "api/requests";

export const loanColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "start_loan_date",
    header: () => <div className="text-left">Date Demande</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("start_loan_date")}
        </div>
      );
    },
  },
  {
    accessorKey: "loan_status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize w-full">
          <div
            className={
              "w-fit p-2 m-1 rounded-lg " +
              statusColorMap[row.getValue("loan_status")]
            }
          >
            {row.getValue("loan_status")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "loan_amount",
    header: "Montant",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("loan_amount")}DA</div>
    ),
  },
  {
    accessorKey: "loan_period",
    header: () => <div className="text-left">Period (mois)</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("loan_period")}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy request ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View Request</DropdownMenuItem>
  //           <DropdownMenuItem>Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
