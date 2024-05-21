import * as React from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoArrowUpSharp } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";

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
} from "../ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store/index";
import { toast } from "sonner";
import { deleteLoan, getLoans, canApplyForLoan } from "api/requests";
// const DeleteButton = ({ id }) => {
//   const { setLoans, setCanApplyLoan } = useStore();
//   const handleDeleteClick = async (e) => {
//     try {
//       const response = await deleteLoan(id);
//       if (response) {
//         toast.success(`la demande (${id}) a été supprimée avec succès.`);
//         const canApply = await canApplyForLoan();
//         const cond = canApply === "True";
//         setCanApplyLoan(cond);
//       }
//       const updatedLoans = await getLoans();
//       setLoans(updatedLoans);
//     } catch (error) {
//       if (error.detail) {
//         toast.error(error.detail);
//       } else if (error.error) {
//         toast.error(error.error);
//       } else {
//         toast.error(
//           "Une erreur s'est produite lors de desactivation du compte."
//         );
//       }
//     }
//   };
//   return (
//     <Button
//       variant="danger"
//       className="hover:bg-red-600 hover:text-white border border-red-800 text-red-800"
//       onClick={(e) => handleDeleteClick(e)}
//     >
//       Supprimer{" "}
//     </Button>
//   );
// };

// // id , motif , amount , actions(see details)
// const NavigateDropdownMenuItem = ({ id, text }) => {
//   // const { setLoanRequestedId } = useStore();

//   const navigate = useNavigate();
//   const parts = window.location.pathname
//     .split("/")
//     .filter((part) => part.trim() !== "");
//   let employee = parts[parts.length - 1];

//   const handleNavigate = () => {
//     // setLoanRequestedId(id);
//     // localStorage.setItem("setLoanRequestedId", id);
//     if (employee === "liste-demandes-pret") {
//       navigate(`${id}`);
//     } else if (employee ==="demandes-employe")  navigate(`pret/${id}`)
//     else navigate(`/liste-demandes-pret/${id}`);
//   };

//   return <DropdownMenuItem onClick={handleNavigate}>{text}</DropdownMenuItem>;
// };

export const recordsColumns = (colsToHide = [], hideDelete = false) => {
  const cols = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID-Demande</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">{row.getValue("id")}</div>
        );
      },
    },
    {
      accessorKey: "created_at",

      header: ({ column }) => (
        <div
          className="text-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Demande
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("created_at")}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-center">Debit</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium flex items-center justify-center gap-1">
          {row?.original?.type === "expense" ? (
            <p className="text-red-500">{row.getValue("amount")}DA</p>
          ) : (
            "--"
          )}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-center">Credit</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium flex items-center justify-center gap-1">
          {row?.original?.type === "expense" ? (
            "--"
          ) : (
            <p className="text-green-500">{row.getValue("amount")}DA</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "motif",
      header: () => <div className="text-center">Motif</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium ">
          {row.getValue("motif").split(" ").slice(0, 5).join(" ") + " ...."}
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
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger style={{ width: "100%" }}>
                  <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                    Details
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col">
                        <h2 className="mt-5 text-base">Type</h2>
                        <span className="text-sm capitalize text-gray-800 font-semibold">
                          {" "}
                          {row?.original?.type}
                        </span>
                        <h2 className="mt-5 text-base">
                          Date de Enregistrement
                        </h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          {" "}
                          {row?.original?.created_at}
                        </p>
                        <h2 className="mt-5 text-base flex gap-2 items-center">
                          la demande correspondant à l'enregistrement.
                          <Link to="">
                            {" "}
                            <FaExternalLinkAlt
                              size={15}
                              className=" transition-all  cursor-pointer   hover:text-gray-600 bg-white"
                            />
                          </Link>
                        </h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          <table class="border w-full text-sm text-left  text-gray-500 ">
                            <thead class=" text-xs text-gray-700 uppercase ">
                              <tr>
                                <th scope="col" class="px-6 py-3 bg-gray-50 ">
                                  id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  employeur
                                </th>
                                <th scope="col" class="px-6 py-3 bg-gray-50 ">
                                  email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                  montant
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white "
                                >
                                  #
                                  {row.original.loan?.employee.id ||
                                    row.original.finaincial_aid?.employee.id}
                                </th>
                                <td class="px-6 py-4">
                                  {row.original.loan?.employee.last_name ||
                                    row.original.finaincial_aid?.employee
                                      .last_name}
                                  {row.original.loan?.employee.first_name ||
                                    row.original.finaincial_aid?.employee
                                      .first_name}
                                </td>
                                <td class="px-6 py-4 bg-gray-50 ">
                                  {row.original.loan?.employee.email ||
                                    row.original.finaincial_aid?.employee.email}
                                </td>
                                <td class="px-6 py-4">
                                  {row.original.loan?.amount ||
                                    row.original.finaincial_aid?.amount}
                                  da
                                </td>
                              </tr>
                            </tbody>
                          </table>{" "}
                        </p>
                        <h2 className="mt-5  text-base">Montant</h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          {" "}
                          {row.original.amount} da
                        </p>
                        <h2 className="mt-5  text-base">Motif</h2>
                        <p className="text-sm capitalize text-gray-800 font-semibold">
                          {row.original.motif}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger style={{ width: "100%" }}>
                  <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                    Annuler
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Annuler</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir annuler cet enregistrement ?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button id={row.original.id}>Oui</Button>
                    <Button id={row.original.id}>Non</Button>
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
