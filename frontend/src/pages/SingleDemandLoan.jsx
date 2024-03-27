import { getUser } from "api/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStore from "store";
import {MdOutlineMail  ,  MdOutlinePhoneInTalk } from "react-icons/md";

export default function SingleDemandLoan({ employee }) {
  const [requestedLoan, setReqeustedLoan] = useState(
    sessionStorage.getItem("requestedLoan") || {}
  );
  const { loans, allLoans } = useStore();
  let LoanId;
  useEffect(() => {
    const parts = window.location.pathname
      .split("/")
      .filter((part) => part.trim() !== "");
    LoanId = parts[parts.length - 1];
    if (employee) {
      // get the loan details from loans
      console.log("loans", loans);
    } else {
      setReqeustedLoan(
        allLoans.filter((loan) => loan.id === Number(LoanId))[0]
      );
      console.log(allLoans);
    }
  }, []);
  useEffect(() => {
    if (requestedLoan) {
      console.log("rr", requestedLoan);
      sessionStorage.setItem("requestedLoan", JSON.stringify(requestedLoan));
      if (!employee) {
        const u = async () => {
          try {
            const user = await getUser(requestedLoan.employee);
            console.log(user);
          } catch (err) {
            console.log(err);
          }
        };
        u();
      }
    }
  }, [requestedLoan]);
  const roleColors = {
    employee: "text-green-900 bg-green-100",
    president: "text-blue-900 bg-blue-100",
    tresorier: "text-yellow-900 bg-yellow-100",
    "vice president": "text-purple-900 bg-purple-100",
    "membre commute": "text-red-900 bg-red-100",
    admin: "text-gray-900 bg-gray-100",
  };
  return (
    <div className="w-full h-full flex flex-col bg-lightgray py-10 px-6  overflow-auto ">
      <div className="flex items-center justify-between">
        <h1 className=" pb-6 bg-lightgray text-xl lg:text-2xl text-black font-bold capitalize">
          Détails de la demande
        </h1>
      </div>

      <div className="w-full flex flex-grow gap-7 ">
        <div className="lg:max-w-[65%] h-fit bg-white p-4 rounded-lg ">
          <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
            Aperçu
          </h1>
          <div className="grid grid-cols-2 gap-3">
            {/* 
          "id": "identifiant"



"loan_period": "durée du prêt"
"loan_status": "statut du prêt" */}
            <div className="">
              <h3 className="font-bold capitalize text-gray-600 ">
                montant du prêt
              </h3>
              <p className="pl-2 font-semibold text-gray-500">200.0000 DA</p>
            </div>
            <div>
              <p className="font-bold capitalize text-gray-600 ">
                demande créée le
              </p>
              <p className="pl-2 font-semibold text-gray-500 ">2024-10-12</p>
            </div>
            <div>
              <p className="font-bold capitalize text-gray-600 ">
                durée du prêt
              </p>
              <p className="pl-2 font-semibold text-gray-500 capitalize">
                {" "}
                12 mois
              </p>
            </div>
            <div>
              <p className="font-bold capitalize text-gray-600 ">
                demande créée le
              </p>
              <p className="pl-2 font-semibold text-gray-500 ">2024-10-12</p>
            </div>
            <div>
              <p className="font-bold capitalize text-gray-600 ">
                méthode de paiement
              </p>
              <p className="pl-2 font-semibold text-gray-500 ">via CCP</p>
            </div>
            <div>
              <p className="font-bold capitalize text-gray-600 ">
                statut du prêt
              </p>
              <p className="pl-2 font-semibold text-gray-500 ">Wait</p>
            </div>
          </div>
          <div className="pt-10">
            <p className="font-bold capitalize text-gray-600 ">
              motivation du prêt
            </p>
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eum
              qui nisi consequatur cum hic non a fugiat assumenda distinctio!
            </p>
          </div>
          {/* {JSON.stringify(requestedLoan)} */}
        </div>
        <div className="lg:max-w-[30%]  w-full  h-fit bg-white p-4 rounded-lg ">
          <div className="flex  justify-between items-center">
            <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
              employé details
            </h1>
            <Link
              href="#"
              className="underline font-semibold pb-2 cursor-pointer"
            >
              Plus de détails
            </Link>
          </div>
          <div className="my-2 flex justify-between items-center">
            <h3 className="font-bold capitalize text-gray-600 text-lg ">
              Omri Mohammed Ilyes
            </h3>
            <div
              className={
                "capitalize w-fit h-fit py-1 px-3  rounded-3xl " +
                roleColors["employee"]
              }
            >
              employee
            </div>
          </div>

          <div className="my-2">
            <h3 className="font-bold capitalize text-gray-600 ">
              Contact info
            </h3>
            <ul className=" pl-2">
              <li className=" text-gray-500  flex items-center gap-2">
                {" "}
                <MdOutlinePhoneInTalk />
               <p> 07-77-77-77-75</p>
              </li>
              <li className="  text-gray-500  flex items-center gap-2"> <MdOutlineMail /> <p>2ilyes@gmail.com</p></li>
            </ul>
          </div>
          <div className="my-2">
            <h3 className="font-bold capitalize text-gray-600 ">Adress</h3>
            <p className="pl-2  text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
              vitae!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 h-fit bg-white p-4 rounded-lg ">
        <h1 className="pb-2  text-xl text-light-blue font-bold capitalize">
          Aperçu
        </h1>
        <div className="grid grid-cols-2 gap-3">
          <div className="">
            <h3 className="font-bold capitalize text-gray-600 ">
              montant du prêt
            </h3>
            <p className="pl-2 font-semibold text-gray-500">200.0000 DA</p>
          </div>
          <div>
            <p className="font-bold capitalize text-gray-600 ">
              demande créée le
            </p>
            <p className="pl-2 font-semibold text-gray-500 ">2024-10-12</p>
          </div>
          <div>
            <p className="font-bold capitalize text-gray-600 ">durée du prêt</p>
            <p className="pl-2 font-semibold text-gray-500 capitalize">
              {" "}
              12 mois
            </p>
          </div>
          <div>
            <p className="font-bold capitalize text-gray-600 ">
              demande créée le
            </p>
            <p className="pl-2 font-semibold text-gray-500 ">2024-10-12</p>
          </div>
          <div>
            <p className="font-bold capitalize text-gray-600 ">
              méthode de paiement
            </p>
            <p className="pl-2 font-semibold text-gray-500 ">via CCP</p>
          </div>
          <div>
            <p className="font-bold capitalize text-gray-600 ">
              statut du prêt
            </p>
            <p className="pl-2 font-semibold text-gray-500 ">Wait</p>
          </div>
        </div>
        <div className="pt-10">
          <p className="font-bold capitalize text-gray-600 ">
            motivation du prêt
          </p>
          <p className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eum
            qui nisi consequatur cum hic non a fugiat assumenda distinctio!
          </p>
        </div>
        {/* {JSON.stringify(requestedLoan)} */}
      </div>
    </div>
  );
}
