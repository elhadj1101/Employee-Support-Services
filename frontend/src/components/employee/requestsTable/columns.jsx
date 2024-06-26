import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
const statuses = {
  finished: "text-green-900 bg-green-100",
  approved: "text-blue-900 bg-blue-100",
  waiting: "text-yellow-900 bg-yellow-100",
  refused: "text-red-900 bg-red-100",
  "vice president": "text-purple-900 bg-purple-100",
  admin: "text-gray-900 bg-gray-100",
};
export const columns = [
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
              statuses[row.getValue("loan_status")]
            }
          >
            {row.getValue("loan_status")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div className="text-left">Type</div>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Email
        //   <CaretSortIcon className="ml-2 h-4 w-4" />
        // </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("amount")}</div>
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
];
