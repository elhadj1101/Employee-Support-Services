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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../../ui/dialog";
import { statusColorMap } from "api/requests";
import { financial_aid_infos } from "api/requests";

import { useNavigate } from "react-router-dom";
import useStore from "../../../store/index";
import { toast } from "sonner";

let typeLabelMap = {};
financial_aid_infos.forEach((e) => {
  typeLabelMap[e.name] = e.description;
});
const DeleteButton = ({ id }) => {
  const { setAdminUsers } = useStore();

  const handleDeleteClick = async (e) => {
    // try {
    //   const response = await deleteUser(id);
    //   if (response.success) {
    //     toast.success("Le compte utilisateur a été désactivé avec succès.");
    //   }
    //   const updatedUsers = await getUsers();
    //   setAdminUsers(updatedUsers);
    // } catch (error) {
    //   if (error.detail) {
    //     toast.error(error.detail);
    //   } else if (error.error) {
    //     toast.error(error.error);
    //   } else {
    //     toast.error(
    //       "Une erreur s'est produite lors de desactivation du compte."
    //     );
    //   }
    // }
  };
  return (
    <Button
      variant="danger"
      className="hover:bg-red-600 hover:text-white border border-red-800 text-red-800"
      onClick={(e) => handleDeleteClick(e)}
    >
      Supprimer{" "}
    </Button>
  );
};
const NavigateDropdownMenuItem = ({ id, text }) => {
  // const { setLoanRequestedId } = useStore();

  const navigate = useNavigate();
  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  let employee = parts[parts.length - 1];
  const handleNavigate = () => {
    // setLoanRequestedId(id);
    // localStorage.setItem("setLoanRequestedId", id);
    if (employee === "liste-demandes-aide-financiere") {
      navigate(`${id}`);
    } else navigate(`aid/${id}`);
  };

  return <DropdownMenuItem onClick={handleNavigate}>{text}</DropdownMenuItem>;
};
export const aidsColumns = (colsToHide = []) => {
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
      header: () => <div className="text-center">ID de l'employer</div>,
      // to filter ids
      accessorFn: (orow) => {
        return orow.employee.toString();
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("employee")}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">{row.getValue("id")}</div>
        );
      },
    },
    {
      accessorKey: "request_created_at",
      header: () => <div className="text-center">Date Demande</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("request_created_at")}
          </div>
        );
      },
    },
    {
      accessorKey: "financial_aid_status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize w-full">
            <div
              className={
                "w-fit p-2 m-auto rounded-lg " +
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
      header: () => <div className="text-center">Type d'aide</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {typeLabelMap[row.getValue("financial_aid_type")]}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-left">Actions</div>,

      enableHiding: false,
      cell: ({ row }) => {
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

              <NavigateDropdownMenuItem
                id={row.original.id}
                text={"Détails de la demande"}
              />
              {row.original.financial_aid_status === "draft" && (
                <NavigateDropdownMenuItem
                  id={"/demande-aide-financiere/" + row.original.id}
                  text={"Modifier le broullion"}
                />
              )}
              <Dialog>
                <DialogTrigger style={{ width: "100%" }}>
                  <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                    Supprimer
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Êtes-vous sûr de Supprimer Cette Demmande?
                    </DialogTitle>
                    <DialogDescription>
                      Cette action va Supprimer definitivement la demmande
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <DeleteButton id={row.original.id} />
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return cols.filter((col) => !colsToHide.includes(col.accessorKey));
};
