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

  const handleDeleteClick = async (e) => {
    try {
      const response = await deleteUser(id);
      if (response.success) {
        toast.success("Le compte utilisateur a été désactivé avec succès.");
      }
      const updatedUsers = await getUsers();
      setAdminUsers(updatedUsers);
    } catch (error) {
      if (error.detail) {
        toast.error(error.detail);
      } else if (error.error) {
        toast.error(error.error);
      } else {
        toast.error(
          "Une erreur s'est produite lors de desactivation du compte."
        );
      }
    }
  };
  return (
    <Button
      variant="danger"
      className="hover:bg-red-600 hover:text-white border border-red-800 text-red-800"
      onClick={(e) => handleDeleteClick(e)}
    >
      Désactiver
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
    accessorKey: "Statut ",
    header: <div className="text-center">Statut</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize w-full flex justify-center">
          <div
            className={
              "w-fit py-1 px-3 m-1 rounded-2xl " +
              (row.original.is_active
                ? "text-green-900 bg-green-100"
                : "text-red-900 bg-red-100")
            }
          >
            {row.original.is_active ? "Activé" : "Désactivé"}
          </div>
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
                  Désactiver
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Êtes-vous sûr de désactiver le compte de cet utilisateur?
                  </DialogTitle>
                  <DialogDescription>
                    Cette action va Désactivera le compte de utilisateur
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
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
