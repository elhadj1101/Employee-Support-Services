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
import { useNavigate } from "react-router-dom";
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
        console.log('row' , row);
        return (
          <div className="text-center font-medium">{row.getValue("id")}</div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: () => <div className="text-center">Date Demande</div>,
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
      header: () => <div className="text-center">Montant</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium flex items-center justify-center gap-1">
          {row.getValue("type") === "expense" ? (
            <IoArrowUpSharp size="20" color="red" className="rotate-180" />
          ) : (
            <IoArrowUpSharp size="20" color="green" />
          )}
          <p>{row.getValue("amount")}DA</p>
        </div>
      ),
    },
    {
      accessorKey: "motif",
      header: () => <div className="text-center">Motif</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium ">{row.getValue("motif").split(' ').slice(0 ,5).join(' ')+' ....'}</div>
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Dialog>
                <DialogTrigger style={{ width: "100%" }}>
                  <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                    Details/Modifier
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription>
                      {/* {JSON.parse(row.original)} */}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    {/* <DialogClose>
                          <DeleteButton id={row.original.id} />
                        </DialogClose> */}
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
