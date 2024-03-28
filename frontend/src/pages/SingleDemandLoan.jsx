import { getUser } from "api/auth";
import React, { useEffect, useState } from "react";

import useStore from "store";
import UserCard from "components/UserCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../components/ui/dialog";

export default function SingleDemandLoan({ employee }) {
  const StatusColors = {
    approved: "text-green-900 bg-green-100",
    waiting: "text-yellow-900 bg-yellow-100",
    refused: "text-red-900 bg-red-100",
    admin: "text-gray-900 bg-gray-100",
  };

  const [requestedLoan, setReqeustedLoan] = useState(
    JSON.parse(sessionStorage.getItem("requestedLoan")) || {}
  );
  const [Usr, setUsr] = useState(
    JSON.parse(sessionStorage.getItem("requestedLoanUser")) || {}
  );

  const { loans, allLoans, LoanRequestedId, setLoanRequestedId , user } = useStore();
  const parts = window.location.pathname
    .split("/")
    .filter((part) => part.trim() !== "");
  let LoanId = parts[parts.length - 1];
  useEffect(() => {
    // change it only when we  want new loan
    console.log(LoanRequestedId, LoanId, allLoans);
    if (LoanRequestedId !== LoanId) {
      if (employee) {
        // get the loan details from
        if (loans.length !== 0) {
          setReqeustedLoan(
            loans.filter((loan) => loan.id === Number(LoanId))[0]
          );
        }
      } else {
        if (allLoans.length !== 0) {
          setReqeustedLoan(
            allLoans.filter((loan) => loan.id === Number(LoanId))[0]
          );
        }
      }
    }
  }, [allLoans, loans]);

  useEffect(() => {
    console.log("req", requestedLoan);

    if (
      allLoans.length !== 0 &&
      requestedLoan &&
      Object.keys(requestedLoan).length !== 0 &&
      LoanRequestedId !== LoanId
    ) {
      sessionStorage.setItem("requestedLoan", JSON.stringify(requestedLoan));
      setLoanRequestedId(LoanId);
      sessionStorage.setItem("requestedLoanId", LoanId);
      if (!employee) {
        const u = async () => {
          try {
            const usr = await getUser(requestedLoan?.employee);
            if (usr) {
              sessionStorage.setItem("requestedLoanUser", JSON.stringify(usr));
              setUsr(usr);
            }
          } catch (err) {
            console.log(err);
          }
        };
        u();
      }
    }
  }, [requestedLoan]);

  return (
    <div className="w-full h-full flex flex-col bg-lightgray py-10 px-6  overflow-auto ">
      <div className="flex items-center justify-between">
        <h1 className=" pb-6 bg-lightgray text-xl lg:text-2xl text-black font-bold capitalize">
          Détails de la demande
        </h1>
      </div>

      <div className="w-full flex flex-grow flex-wrap lg:flex-nowrap gap-7 ">
        {/* loan details card */}

        <div className="w-full">
          <div className="lg:min-w-[60%] xl:min-w-[65%] h-fit bg-white p-4 rounded-lg ">
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              Aperçu
            </h1>
            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <h3 className="font-bold capitalize text-gray-600 ">
                  montant du prêt
                </h3>
                <p className="pl-2 font-semibold text-gray-500">
                  {" "}
                  {requestedLoan?.loan_amount} DA
                </p>
              </div>
              <div>
                {/* {JSON.stringify(requestedLoan)} */}
                <p className="font-bold capitalize text-gray-600 ">
                  demande créée le
                </p>
                <p className="pl-2 font-semibold text-gray-500 ">
                  {requestedLoan?.request_created_at}
                </p>
              </div>
              <div>
                <div className="flex items gap-2">
                  <p className="font-bold  capitalize text-gray-600 ">
                    statut du prêt
                  </p>
                  {!employee && user?.role !=='employee' &&  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-7 w-7 p-0">
                        <span className="sr-only">ouvrir menu</span>
                        <FiEdit3 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Statut</DropdownMenuLabel>
                      <Dialog>
                        {/* {requestedLoan &&
                          Object.keys(StatusColors)
                            .filter(
                              (status) => status !== requestedLoan?.loan_status
                            )
                            .map((status) => (
                              <DialogTrigger
                                key={status}
                                style={{ width: "100%" }}
                              >
                                <div className=" w-full cursor-pointer text-left  px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                                  {status}
                                </div>
                              </DialogTrigger>
                            ))} */}
                        {requestedLoan &&
                          Object.keys({
                            finished: "finished",
                            approved: "approved",
                          })
                            .filter(
                              (status) => status !== requestedLoan.loan_status
                            )
                            .map((status) => (
                              <DialogTrigger
                                key={status}
                                style={{ width: "100%" }}
                              >
                                <div className="w-full cursor-pointer text-left px-2 py-1.5 text-sm transition-colors hover:bg-slate-100">
                                  {status}
                                </div>
                              </DialogTrigger>
                            ))}

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Êtes-vous sûr de changer le statut de cet
                              demmande?
                            </DialogTitle>
                            <DialogDescription>
                              Cette action va changer le statut de la demmande
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button className="hover:bg-white hover:text-light-blue border border-light-blue bg-light-blue">
                                changer
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>}
                
                </div>

                <div
                  className={
                    "w-fit py-1 px-3 rounded-3xl mt-1 " +
                    StatusColors[requestedLoan?.loan_status]
                  }
                >
                  {requestedLoan?.loan_status}
                </div>
              </div>
              <div>
                <p className="font-bold capitalize text-gray-600 ">
                  durée du prêt
                </p>
                <p className="pl-2 font-semibold text-gray-500 capitalize">
                  {" "}
                  {requestedLoan?.loan_period} mois
                </p>
              </div>

              <div>
                <p className="font-bold capitalize text-gray-600 ">
                  méthode de paiement
                </p>
                <p className="pl-2 font-semibold text-gray-500  uppercase ">
                  {" "}
                  <span className="lowercase">via</span>{" "}
                  {requestedLoan?.payment_method}{" "}
                </p>
              </div>
            </div>
            <div className="pt-10">
              <p className="font-bold capitalize text-gray-600 ">
                motivation du prêt
              </p>
              <p className="p-2">{requestedLoan?.loan_motivation}</p>
            </div>
            {/* {JSON.stringify(requestedLoan)} */}
          </div>

          {/* files */}
          <div className="mt-5 h-fit bg-white p-4 rounded-lg ">
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              Pièces jointes
            </h1>
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              Pièces jointes
            </h1>
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              Pièces jointes
            </h1>
          </div>
        </div>

        {/* employee card */}
        {!employee && user?.role!=='employee'&& Usr && <UserCard user={Usr} />}
      </div>
    </div>
  );
}
