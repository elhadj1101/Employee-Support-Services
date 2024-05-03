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
import BarChart from "components/tresorier/TresorierCharts";


import { ComboBox } from "components/tresorier/comboBox";
import { Input } from "components/ui/input";
import { useState } from "react";
import { Button } from "components/ui/button";
import { addRecord } from "api/records";
function TresaurierDashboard() {
  const recordCol = recordsColumns([], true) || [];
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
      setDemmandeSelecter({})

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
  const { Records, allLoans, allAids } = useStore();
  const handleSubmit = async (e) => {
    e.preventDefault();  
    if (newRecord.type === "expense") {
      if (!newRecord.conection) {
        setError(true);
      } else {
        const res = addRecord({
          type: newRecord.type,
          amount: newRecord.amount,
          motif: newRecord.motif,
          [newRecord.conection]: newRecord.id
        });
        HandleOpen();
        setDemmandeSelecter({});
      }
    } else {
      // type=income
      if (newRecord.amount !== 0) {
        const res =  addRecord({
          type: newRecord.type,
          amount: newRecord.amount,
          motif: newRecord.motif,
          ...(newRecord.conection && { [newRecord.conection]: newRecord.id })
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
  return (
    <div className="mt-6">
      <div className="flex gap-6">
        <Card
          title="Budget"
          price={2500}
          ReactIcon={<FaCashRegister size={40} />}
        />
        <Card
          title="Revenue"
          price={2500}
          ReactIcon={<MdOutlineAttachMoney size={40} />}
        />
        <Card
          title="Income"
          price={200}
          ReactIcon={<MdMoneyOffCsred size={40} />}
        />
      </div>
      <BarChart />

      <div className=" w-full flex flex-grow flex-wrap lg:flex-nowrap gap-6   ">
        <div className="shadoww w-full lg:max-w-[66%]  h-fit bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className=" pt-2 text-[#262b40] text-xl font-bold capitalize">
              Tout les records
            </h1>
            <Dialog open={open} onOpenChange={HandleOpen}>
              <DialogTrigger>
                <div className=" flex items-center gap-2 text-white rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color bg-light-blue border border-light-blue hover:bg-slate-100 hover:text-black hover:border-black">
                  Ajouter <GoPlus className="mt-[2px]  size-4" />
                </div>
              </DialogTrigger>
              <DialogContent className=" ">
                <DialogHeader>
                  <DialogTitle>Ajouter nouveau record </DialogTitle>
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
                              };
                            });
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
                            }));
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
                            selecter corespondant au record
                            <span className="text-red-600 ml-1">*</span>{" "}
                          </h2>
                          <ComboBox
                            loans={allLoans}
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

                          <h2 className="mt-5 mb-2 opacity-50">Amount</h2>
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
                            selecter corespondant au record
                          </h2>
                          <ComboBox
                            loans={allLoans}
                            aids={allAids}
                            demmandeSelecter={demmandeSelecter}
                            handleComboBox={handleComboBox}
                            error={error}
                          />
                          <h2 className="mt-5 mb-2 ">
                            Amount
                            <span className="text-red-600 ml-1">*</span>
                            <span className="text-xs ml-1">( le mantant must be inferieur than the total mantant de la demmande  {demmandeSelecter.amount})</span>
                          </h2>
                          <Input
                            type="number"
                            placeholder="100000"
                            value={newRecord?.amount}
                            onChange={(e) =>{
                              if(Number( e.target.value)  && Number(demmandeSelecter.amount) >= Number( e.target.value) ){
                                setNewRecord((prev) => {
                                  console.log(e.target.value, newRecord.amount);
                                  return { ...prev, amount: e.target.value };
                                })
                              }
                            } 
                            }
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
                                console.log(e.target.value, newRecord.motif);
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

          {Records.length !== 0 && (
            <RecordsTable data={Records} columns={recordCol} />
          )}
        </div>
        <div className="shadoww w-full lg:max-w-[32%]  h-fit bg-white p-4 rounded-lg">
          test
        </div>
      </div>
    </div>
  );
}

export default TresaurierDashboard;
