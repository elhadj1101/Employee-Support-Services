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
import { statusColorMap, statusTranslateMap } from "api/requests";

import { useNavigate } from "react-router-dom";
import useStore from "../../../store/index";
import { toast } from "sonner";
import { deleteLoan, getLoans, canApplyForLoan } from "api/requests";
const DeleteButton = ({ id }) => {
  const { setLoans, setCanApplyLoan } = useStore();
  const handleDeleteClick = async (e) => {
    try {
      const response = await deleteLoan(id);
      if (response) {
        toast.success(`la demande (${id}) a été supprimée avec succès.`);
        const canApply = await canApplyForLoan();
        const cond = canApply === "True";
        setCanApplyLoan(cond);
      }
      const updatedLoans = await getLoans();
      setLoans(updatedLoans);
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
      Supprimer{" "}
    </Button>
  );
};
const NavigateDropdownMenuItem = ({ id, text, path = null }) => {
  // const { setLoanRequestedId } = useStore();

  const navigate = useNavigate();
  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");

  let employee = parts[parts.length - 1];

  const handleNavigate = () => {
    // setLoanRequestedId(id);
    // localStorage.setItem("setLoanRequestedId", id);
      if (path) {
        navigate(path);
        return;
      }
    if (employee === "liste-demandes-pret") {
      navigate(`${id}`);
    } else if (employee === "demandes-employe") navigate(`pret/${id}`);
    else navigate(`/liste-demandes-pret/${id}`);
  };

  return <DropdownMenuItem onClick={handleNavigate}>{text}</DropdownMenuItem>;
};

export const loanColumns = (
  colsToHide = [],
  hideDelete = false,
  role = "any"
) => {
  const cols = [
  
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
      accessorKey: "employee",
      header: () => <div className="text-center">ID-Employer</div>,
      // to filter ids
      accessorFn: (orow) => {
        return orow.employee.id.toString();
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("employee")}
        </div>
      ),
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
      accessorKey: "loan_status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="capitalize w-full flex justify-center">
            <div
              className={
                "w-fit py-1 px-3 m-1 rounded-3xl " +
                statusColorMap[row.getValue("loan_status").toLowerCase()]
              }
            >
              {statusTranslateMap[row.getValue("loan_status")]}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-center">Montant par mois</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("amount")}DA
        </div>
      ),
    },
    {
      accessorKey: "loan_period",
      header: () => <div className="text-center">Period (mois)</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("loan_period")}
          </div>
        );
      },
    },
    {
      accessorKey: "payment_method",
      header: () => <div className="text-center">Methode de payement</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.getValue("payment_method")}
          </div>
        );
      },
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
              <NavigateDropdownMenuItem
                id={row.original.id}
                text={"Détails de la demande"}
              />
              {role === "tresorier" &&
                row.original.loan_status === "approved" && (
                  <NavigateDropdownMenuItem
                    path={"/"}
                    id=""
                    text={"Payement de la demande"}
                  />
                )}
              {row.original.loan_status === "draft" && (
                <NavigateDropdownMenuItem
                  id={"/demande-pret/" + row.original.id}
                  text={"Modifier le broullion"}
                />
              )}
              {["draft"].includes(row.original.loan_status) && !hideDelete && (
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
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return cols.filter((col) => !colsToHide.includes(col.accessorKey));
};
