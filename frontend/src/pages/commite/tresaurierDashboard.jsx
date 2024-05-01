import Card from "components/Card";
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdMoneyOffCsred } from "react-icons/md";
import useStore from "store/index.js";
import { GiPayMoney  , GiReceiveMoney  } from "react-icons/gi";
import {GoPlus} from 'react-icons/go'
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
function TresaurierDashboard() {
  const recordCol = recordsColumns([], true) || [];
  const { Records } = useStore();
  console.log("recoreds", Records);
  return (
    <div className="mt-10">
      <div className="flex  gap-6">
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

      <div className=" w-full flex flex-grow flex-wrap lg:flex-nowrap gap-6   ">
        <div className="shadoww w-full lg:max-w-[66%]  h-fit bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className=" pt-2 text-[#262b40] text-xl font-bold capitalize">
              Tout les records
            </h1>
            <Dialog>
              <DialogTrigger>
                <div className=" flex items-center gap-2 text-white rounded-md cursor-pointer text-center px-2 py-1.5 text-sm transition-color bg-light-blue border border-light-blue hover:bg-slate-100 hover:text-black hover:border-black">
                  Ajouter <GoPlus className="mt-[2px]  size-4" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter nouveau record </DialogTitle>
                  <DialogDescription>
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-3 ">
                        <div className=" cursor-pointer flex items-center gap-3 px-5 py-[14.1px] w-1/2 rounded-lg border border-[#5b5b5b] hover:border-light-blue hover:bg-[#ccd5fa] text-[#262b40] transition-all">
                          <GiPayMoney size='30' className="mt-3" />
                          <p className="text-lg">Revenue</p>
                        </div>
                        <div className=" cursor-pointer flex items-center gap-3 p-5 w-1/2 rounded-lg border border-[#5b5b5b] hover:border-light-blue hover:bg-[#ccd5fa] text-[#262b40] transition-all">
                          <GiReceiveMoney size='30' className="" />
                          <p className="text-lg">Income</p>
                        </div>
     
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {/* <DialogClose>
                          <DeleteButton id={row.original.id} />
                        </DialogClose> */}
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
