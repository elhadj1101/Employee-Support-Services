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
import { statusColorMap  } from "api/requests" ;
import { financial_aid_infos } from "api/requests";


let  typeLabelMap = {}
financial_aid_infos.forEach(
  (e) => {
    typeLabelMap[e.name] = e.description ;
  });

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
              statusColorMap[row.getValue("financial_aid_status")]
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
        {typeLabelMap[row.getValue("financial_aid_type")]}
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
