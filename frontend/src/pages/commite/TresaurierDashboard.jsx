import Card from "components/Card";
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdMoneyOffCsred } from "react-icons/md";
import useStore from "store/index.js";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { GoPlus } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../../components/ui/dialog";
import RecordsTable from "components/tresorier/RecordsTable";
import { recordsColumns } from "components/tresorier/RecordsColumns";
import TresorierCharts from "components/tresorier/TresorierCharts";
import { IoEye } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { ComboBox } from "components/tresorier/comboBox";
import { Input } from "components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import { addRecord, fetchAnalitics, fetchDoghnouts } from "api/records";
import { formatPrice, weekNumber } from "components/utils/utilFunctions";
import { Link } from "react-router-dom";

function TresaurierDashboard() {
  const recordCol = recordsColumns([], true) || [];
  const [analiticsByMonth, setAnaliticsByMonth] = useState({});
  const [doughnoutData, setDoughnoutData] = useState({});
  const [currentPeriodData, setCurrentPeriodData] = useState({
    currntYear: new Date().getFullYear(),
    startYear: new Date().getFullYear() - 7,
    endYear: new Date().getFullYear(),
    currntWeek: weekNumber(),
  });
  const [open, setOpen] = useState(false);
  const HandleOpen = () => {
    if (open) {
      setError(false);
      setOpen(false);
      setNewRecord({
        type: "",
        amount: "",
        motif: "",
        conection: null,
        id: "",
      });
      setDemmandeSelecter({});
    } else {
      setOpen(true);
    }
  };
  const [newRecord, setNewRecord] = useState({
    type: "",
    amount: "",
    motif: "",
    conection: null,
    id: "",
  });
  const [demmandeSelecter, setDemmandeSelecter] = useState({});
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const [RecordType, setRecordType] = useState("");
  const { Records, allLoans, allAids , Commity } = useStore();
  const all =[...allLoans , ...allAids]

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRecord.type === "expense") {
      if (!newRecord.conection) {
        setError(true);
      } else {
        addRecord({
          type: newRecord.type,
          amount: newRecord.amount,
          motif: newRecord.motif,
          [newRecord.conection]: newRecord.id,
        });
        
        HandleOpen();
        setDemmandeSelecter({});
      }
    } else {
      // type=income
      if (newRecord.amount !== 0) {
        addRecord({
          type: newRecord.type,
          amount: newRecord.amount,
          motif: newRecord.motif,
          ...(newRecord.conection && { [newRecord.conection]: newRecord.id }),
        });
        
        HandleOpen();
        setDemmandeSelecter({});
      }
    }
  };

  const handleComboBox = (currentValue, demmande, conection) => {
    if (Number(currentValue.split(" ")[0].slice(1)) === demmandeSelecter.id) {
      setDemmandeSelecter({});
      setNewRecord((prev) => {
        return { ...prev, amount: "", conection: null, id: "" };
      });
    } else {
      setDemmandeSelecter({ ...demmande });
      setNewRecord((prev) => {
        return {
          ...prev,
          amount: demmande.amount,
          conection: conection,
          id: demmande.id,
        };
      });
    }
  };
const handelTopSectionAddRecord =(demmande)=>{
  setOpen(true);
  setNewRecord({
    type: "expense",
    amount: "",
    motif: "",
    conection: null,
    id: "",
  });
  setDemmandeSelecter(demmande);
}
  useEffect(() => {
    fetchAnalitics(setAnaliticsByMonth, currentPeriodData.currntYear);
    fetchDoghnouts(setDoughnoutData, new Date().getFullYear(), true);
  }, []);
  return (
    <div className="mt-6">
      <div className="flex gap-6 ">
        <Card
          title="Budget"
          price={formatPrice(Commity?.current_balance, " ")}
          ReactIcon={<FaCashRegister size={40} color="" />}
        />
        <Card
          title="Revenue"
          price={formatPrice(Commity?.current_year_income, " ")}
          ReactIcon={<MdOutlineAttachMoney size={40} />}
        />
        <Card
          title="Dépense"
          price={formatPrice(Commity?.current_year_expenses, " ")}
          ReactIcon={<MdMoneyOffCsred size={40} />}
        />
      </div>
      <TresorierCharts
        doughnoutData={doughnoutData}
        setDoughnoutData={setDoughnoutData}
        monthlyData={analiticsByMonth}
        currentPeriodData={currentPeriodData}
        setCurrentPeriodData={setCurrentPeriodData}
        setAnaliticsByMonth={setAnaliticsByMonth}
      />
      
      <div id="records" className=" w-full  flex flex-grow flex-wrap h-full lg:flex-nowrap gap-6   ">
        <div className="shadoww  w-full lg:max-w-[66%] flex-grow bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className=" pt-2 text-[#262b40] text-xl font-bold capitalize">
              Tout les enregistrements
            </h1>
            <Dialog open={open} onOpenChange={HandleOpen}>
              <DialogTrigger>
                <div className=" flex items-center gap-2 text-white rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color bg-light-blue border border-light-blue hover:bg-slate-100 hover:text-black hover:border-black">
                  Ajouter <GoPlus className="mt-[2px]  size-4" />
                </div>
              </DialogTrigger>
              <DialogContent className=" ">
                <DialogHeader>
                  <DialogTitle> Ajouter un nouveau enregistrement </DialogTitle>
                  <DialogDescription>
                    <div className="p-3">
                      <h2 className="pb-2">Type</h2>
                      <div className="flex items-center justify-between gap-3 ">
                        <div
                          onClick={() => {
                            setNewRecord((prev) => {
                              return {
                                ...prev,
                                type: prev.type === "expense" ? "" : "expense",
                                conection: null,
                              };
                            });
                          setDemmandeSelecter({});

                          }}
                          className={` shadow-sm cursor-pointer flex items-center gap-3 px-5 py-[14.1px] w-1/2 rounded-lg border   text-[#262b40]  ${
                            newRecord.type === "expense"
                              ? "border-light-blue bg-[#ccd5fa]"
                              : "border-slate-200 "
                          } hover:border-light-blue hover:bg-[#ccd5fa] transition-all`}
                        >
                          <GiPayMoney size="30" className="mt-3" />
                          <p className="text-lg">Dépense </p>
                        </div>

                        <div
                          onClick={() => {
                            setNewRecord((prev) => ({
                              ...prev,
                              type: prev.type === "income" ? "" : "income",
                              conection: null,
                            }));
                            setDemmandeSelecter({})
                          }}
                          className={` shadow-sm cursor-pointer flex items-center gap-3 p-5  w-1/2 rounded-lg border   text-[#262b40]  ${
                            newRecord.type === "income"
                              ? "border-light-blue bg-[#ccd5fa]"
                              : "border-slate-200 "
                          } hover:border-light-blue hover:bg-[#ccd5fa] transition-all`}
                        >
                          <GiReceiveMoney size="30" className="" />
                          <p className="text-lg">Revenue</p>
                        </div>
                      </div>
                      {newRecord.type === "expense" ? (
                        <div className="flex flex-col">
                          <h2 className="mt-5">
                            Sélectionner la demande correspondant à
                            l'enregistrement.
                            <span className="text-red-600 ml-1">*</span>{" "}
                          </h2>
                          <ComboBox
                            loans={allLoans}
                            newRecord={newRecord}
                            aids={allAids}
                            demmandeSelecter={demmandeSelecter}
                            handleComboBox={handleComboBox}
                            error={error}
                          />
                          {error && (
                            <p className="text-red-600 text-xs pl-3">
                              il faut selecter une demmande
                            </p>
                          )}

                          <h2 className="mt-5 mb-2 opacity-50">Montant</h2>
                          <Input
                            type="number"
                            placeholder="100000"
                            value={newRecord?.amount}
                            disabled
                            className="placeholder:text-slate-500 disabled:opacity-50 "
                          />
                          <h2 className="mt-5 mb-2">Motif</h2>
                          <textarea
                            className="placeholder:text-slate-500 outline-none focus:outline-none resize-none w-full shadow-sm   max-h-20 h-20 border border-gray-200  rounded-md  p-2    "
                            type="text"
                            placeholder="Décriver qulque chose ....."
                            value={newRecord.motif}
                            onChange={(e) =>
                              setNewRecord((prev) => {
                                return { ...prev, motif: e.target.value };
                              })
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {newRecord.type === "income" ? (
                        <div className="flex flex-col">
                          <h2 className="mt-5">
                            Sélectionner la demande correspondant à
                            l'enregistrement.
                          </h2>
                          <ComboBox
                            newRecord={newRecord}
                            loans={allLoans}
                            aids={allAids}
                            demmandeSelecter={demmandeSelecter}
                            handleComboBox={handleComboBox}
                            error={error}
                          />
                          <h2 className="mt-5 mb-2 ">
                            Montant
                            <span className="text-red-600 ml-1">*</span>
                            <span className="text-xs ml-1">
                              ( Le montant doit être inférieur au total de la
                              demande.{" "}
                              {demmandeSelecter.amount *
                                demmandeSelecter.loan_period}
                              )
                            </span>
                          </h2>
                          <Input
                            type="text"
                            placeholder="100000"
                            value={newRecord?.amount}
                            onChange={(e) => {
                              const price = parseFloat(e.target.value);
                              console.log(
                                parseFloat(
                                  demmandeSelecter.amount *
                                    demmandeSelecter.loan_period -
                                    demmandeSelecter.paid_amount
                                )
                              );
                              if (!isNaN(price)) {
                                if (
                                  demmandeSelecter.id &&
                                  parseFloat(
                                    demmandeSelecter.amount *
                                      demmandeSelecter.loan_period -
                                      demmandeSelecter.paid_amount
                                  ) >= price
                                ) {
                                  setNewRecord((prev) => ({
                                    ...prev,
                                    amount: price,
                                  }));
                                } else if (!demmandeSelecter.id) {
                                  setNewRecord((prev) => ({
                                    ...prev,
                                    amount: price,
                                  }));
                                }
                              }
                            }}
                            className="placeholder:text-slate-500  "
                          />

                          <h2 className="mt-5 mb-2">Motif</h2>
                          <textarea
                            className="placeholder:text-slate-500 outline-none focus:outline-none resize-none w-full shadow-sm   max-h-20 h-20 border border-gray-200  rounded-md  p-2    "
                            type="text"
                            placeholder="Décriver qulque chose ....."
                            value={newRecord.motif}
                            onChange={(e) =>
                              setNewRecord((prev) => {
                                return { ...prev, motif: e.target.value };
                              })
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {newRecord.type.length !== 0 && (
                    <Button onClick={(e) => handleSubmit(e)}>
                      Enregistrer
                    </Button>
                  )}
                  <DialogClose>
                    <Button onClick={HandleOpen}>Annuler</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-1 mt-3  items-center">
            <p className="px-2 py-1.5  flex items-center">
              {" "}
              <FiFilter size={15} /> filtre:
            </p>
            <div
              onClick={() => {
                setRecordType((prev) => (prev === "income" ? "" : "income"));
              }}
              className={` ${
                RecordType === "income"
                  ? "bg-slate-100 text-black border-black"
                  : "text-gray-400"
              } flex items-center gap-2  rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color   hover:bg-slate-100 hover:text-black hover:border-black`}
            >
              revenue
            </div>
            <div
              onClick={() => {
                setRecordType((prev) => (prev === "expense" ? "" : "expense"));
              }}
              className={` ${
                RecordType === "expense"
                  ? "bg-slate-100 text-black border-black"
                  : "text-gray-400"
              } flex items-center gap-2  rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color   hover:bg-slate-100 hover:text-black hover:border-black`}
            >
              depense
            </div>
          </div>
          {Records.length !== 0 && (
            <div className=" ">
              <RecordsTable
                data={Records}
                columns={recordCol}
                RecordType={RecordType}
              />
            </div>
          )}
        </div>
        <div className="shadoww w-full lg:max-w-[32%]  h-fit bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className=" pt-2 text-[#262b40] text-xl font-bold capitalize">
              5 recents demmandes
            </h1>
            <Link to="/demandes-employe">
              <div className=" flex items-center gap-2 text-white rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color bg-light-blue border border-light-blue hover:bg-slate-100 hover:text-black hover:border-black">
                Voir Tout
              </div>
            </Link>
          </div>
          <div className="flex gap-1 mt-3  items-center">
            <p className="px-2 py-1.5  flex items-center">
              {" "}
              <FiFilter size={15} /> filtre:
            </p>
            <div
              onClick={() => {
                setType((prev) => (prev === "aids" ? "" : "aids"));
              }}
              className={` ${
                type === "aids"
                  ? "bg-slate-100 text-black border-black"
                  : "text-gray-400"
              } flex items-center gap-2  rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color   hover:bg-slate-100 hover:text-black hover:border-black`}
            >
              Aids
            </div>
            <div
              onClick={() => {
                setType((prev) => (prev === "prets" ? "" : "prets"));
              }}
              className={` ${
                type === "prets"
                  ? "bg-slate-100 text-black border-black"
                  : "text-gray-400"
              } flex items-center gap-2  rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color   hover:bg-slate-100 hover:text-black hover:border-black`}
            >
              Prets
            </div>
          </div>
          {all.filter(
            (demmande) =>
              demmande?.loan_status === "approved" ||
              demmande?.financial_aid_status === "approved"
          ).length === 0 ? (
            <p className="text-center my-5 text-sm text-gray-500">
              Il n'existe aucune demande acceptée.
            </p>
          ) : (
            ""
          )}

          {all.filter(
            (demmande) =>
              demmande?.loan_status === "approved" ||
              demmande?.financial_aid_status === "approved"
          ).length !== 0 &&
            type === "" &&
            all
              .filter(
                (demmande) =>
                  demmande?.loan_status === "approved" ||
                  demmande?.financial_aid_status === "approved"
              )
              .slice(0, 5)
              .map((demmande, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 my-2"
                >
                  <div className="text-base">
                    <p>
                      {demmande?.employee?.first_name}{" "}
                      {demmande?.employee?.last_name}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-3 ml-1">
                      {demmande?.employee?.email}/{" "}
                      {demmande?.loan_status ? "pret" : "aid"}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <FaMoneyBillTransfer
                      onClick={() => handelTopSectionAddRecord(demmande)}
                      size={20}
                      className=" transition-all hover:bg-green-600 cursor-pointer hover:text-white rounded-full  p-1 w-7 h-7 text-green-600 bg-white"
                    />
                    <Link
                      to={`demandes-employe/${
                        demmande?.loan_status === "approved" ? "pret" : "aid"
                      }/${demmande.id}`}
                      target="_blank"
                    >
                      <IoEye
                        size={20}
                        className=" transition-all hover:bg-yellow-500 cursor-pointer hover:text-white rounded-full  p-1 w-7 h-7 text-yellow-500 bg-white"
                      />
                    </Link>
                  </div>
                </div>
              ))}
          {all.filter(
            (demmande) =>
              demmande?.loan_status === "approved" ||
              demmande?.financial_aid_status === "approved"
          ).length !== 0 &&
            type === "prets" &&
            allLoans &&
            allLoans
              .filter((loan) => loan.loan_status === "approved")
              .slice(0, 5)
              .map((loan) => (
                <div className="flex items-center justify-between p-2 my-2">
                  <div className="text-base">
                    <p>
                      {loan?.employee?.first_name} {loan?.employee?.last_name}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-3 ml-1">
                      {loan?.employee?.email}/ pret
                    </p>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <FaMoneyBillTransfer
                      size={20}
                      onClick={() => handelTopSectionAddRecord(loan)}
                      className=" transition-all hover:bg-green-600 cursor-pointer hover:text-white rounded-full  p-1 w-7 h-7 text-green-600 bg-white"
                    />
                    <Link
                      to={`demandes-employe/pret/${loan.id}`}
                      target="_blank"
                    >
                      <IoEye
                        size={20}
                        className=" transition-all hover:bg-yellow-500 cursor-pointer hover:text-white rounded-full  p-1 w-7 h-7 text-yellow-500 bg-white"
                      />
                    </Link>
                  </div>
                </div>
              ))}
          {all.filter(
            (demmande) =>
              demmande?.loan_status === "approved" ||
              demmande?.financial_aid_status === "approved"
          ).length !== 0 &&
            type === "aids" &&
            allAids &&
            allAids
              .filter((aid) => aid.financial_aid_status === "approved")
              .slice(0, 5)
              .map((aid) => (
                <div className="flex items-center justify-between p-2 my-2">
                  <div className="text-base">
                    <p>
                      {aid?.employee?.first_name} {aid?.employee?.last_name}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-3 ml-1">
                      {aid?.employee?.email} / aid
                    </p>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <FaMoneyBillTransfer
                      onClick={() => handelTopSectionAddRecord(aid)}
                      size={20}
                      className=" transition-all hover:bg-green-600 cursor-pointer hover:text-white rounded-full  p-1 w-7 h-7 text-green-600 bg-white"
                    />
                    <Link to={`demandes-employe/aid/${aid.id}`} target="_blank">
                      <IoEye
                        size={20}
                        className=" transition-all hover:bg-yellow-500 cursor-pointer hover:text-white rounded-full  p-1 w-7 h-7 text-yellow-500 bg-white"
                      />
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default TresaurierDashboard;
