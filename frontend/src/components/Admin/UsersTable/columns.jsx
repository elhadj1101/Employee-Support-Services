import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

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
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../../api/auth";
import useStore from "../../../store/index";
import { toast } from "sonner";
const roleColors = {
  employee: "text-green-900 bg-green-100",
  president: "text-blue-900 bg-blue-100",
  tresorier: "text-yellow-900 bg-yellow-100",
  "vice president": "text-purple-900 bg-purple-100",
  "membre commute": "text-red-900 bg-red-100",
  admin: "text-gray-900 bg-gray-100",
};

const UserDeleteButton = ({ id }) => {
  const { setAdminUsers } = useStore();

  const handleDeleteClick = async () => {
    try {
      const response = await deleteUser(id);
      console.log("Response: ", response);
      const updatedUsers = await getUsers();
      console.log("Updated:", updatedUsers);
      setAdminUsers(updatedUsers);
    } catch (error) {
      if (error.detail) {
        toast.error(error.detail);
      } else {
        toast.error(
          "Une erreur s'est produite lors de la récupération des données."
        );
      }
    }
  };
  return (
    <Button
      variant="danger"
      className="hover:bg-light-blue hover:text-white border border-light-blue text-light-blue"
      onClick={handleDeleteClick}
    >
      Supprimer
    </Button>
  );
};
const NavigateDropdownMenuItem = ({ id, email, text }) => {
  const { setProfileRequsted } = useStore();

  const navigate = useNavigate();
  const handleNavigate = () => {
    setProfileRequsted(id);
    localStorage.setItem("profileRequsted", id);

    navigate(`${id}`);
  };

  return <DropdownMenuItem onClick={handleNavigate}>{text}</DropdownMenuItem>;
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
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("id")}</div>
      );
    },
  },
  {
    accessorKey: "nom",
    header: () => <div className="text-center">Nom</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("nom")}</div>
      );
    },
  },
  {
    accessorKey: "prenom",
    header: () => <div className="text-center">Prenom</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("prenom")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center mx-auto"
        >
          <div className="text-center">Email</div>
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase flex justify-center">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: <div className="text-center">Role</div>,
    cell: ({ row }) => (
      <div className="capitalize w-full flex justify-center">
        <div
          className={
            "w-fit py-1 px-3 m-1 rounded-3xl " +
            roleColors[row.getValue("role").toLowerCase()]
          }
        >
          {row.getValue("role")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "telephone",
    header: () => <div className="text-center">Telephone</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium flex justify-center">
          {row.getValue("telephone")}
        </div>
      );
    },
  },
  {
    id: "actions",
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
              email={row.original.email}
              id={row.original.id}
              text={"Détails / Modifier"}
            />

            <Dialog>
              <DialogTrigger style={{ width: "100%" }}>
                <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                  Supprimer
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Êtes-vous sûr de supprimer cet utilisateur?
                  </DialogTitle>
                  <DialogDescription>
                    <p className="mt-3">
                      {" "}
                      Cette action est irréversible. Elle supprimera
                      définitivement le compte utilisateur et effacera vos
                      données de nos serveurs.
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <UserDeleteButton id={row.original.id} />
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
