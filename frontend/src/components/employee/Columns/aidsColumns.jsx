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
  approved: "text-green-900 bg-green-100",
  waiting: "text-yellow-900 bg-yellow-100",
  refused: "text-red-900 bg-red-100",
  admin: "text-gray-900 bg-gray-100",
};
export const aidsColumns = [
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
    accessorKey: "request_created_at",
    header: () => <div className="text-left">Date Demande</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("request_created_at")}
        </div>
      );
    },
  },
  {
    accessorKey: "financial_aid_status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize w-full">
          <div
            className={
              "w-fit p-2 m-1 rounded-lg " +
              statuses[row.getValue("financial_aid_status")]
            }
          >
            {row.getValue("financial_aid_status")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "financial_aid_type",
    header: "Type d'aide",
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.getValue("financial_aid_type")}
      </div>
    ),
  },
  {
    accessorKey: "request_response_at",
    header: () => <div className="text-left">Date de reponse</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("request_response_at") || "--"}
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
