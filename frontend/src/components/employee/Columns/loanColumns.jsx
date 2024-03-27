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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { statusColorMap } from "api/requests";

export const loanColumns = (colsToHide=[]) =>{
  const cols = [
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
      accessorKey: "employee",
      header: "ID de l'employer",
      // to filter ids
      accessorFn: (orow) => {
        return orow.employee.toString();
      },
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("employee")}</div>
      ),
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
      header: "Montant par mois",
      cell: ({ row }) => (
        <div className="text-left font-medium">
          {row.getValue("loan_amount")}DA
        </div>
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const loan = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(loan.id)}
              >
                Copy request ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Afficher les details</DropdownMenuItem>
              {loan.loan_status === "draft" && (
                <DropdownMenuItem>Modifier le brouillon</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return cols.filter((col) => !colsToHide.includes(col.accessorKey));

}