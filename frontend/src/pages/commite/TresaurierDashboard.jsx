import TestTable from "components/Admin/UsersTable/TestTable";
import Card from "components/Card";
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdMoneyOffCsred } from "react-icons/md";
import RequestsTable from "components/employee/requestsTable/RequetsTable";
import { aidsColumns } from "components/employee/Columns/aidsColumns";
import useStore from "store/index.js";
function TresaurierDashboard() {
  const { aids} = useStore();
  const cols = aidsColumns(["employee"]) || [];
  return (
    <div className="mt-10">
      <div className="flex mx-6 gap-6">
        <Card title="Budget" price={2500}  ReactIcon={<FaCashRegister size={50}  />} />
        <Card title="Revenue" price={2500}  ReactIcon={<MdOutlineAttachMoney size={50}  />} />
        <Card title="Income" price={200}  ReactIcon={<MdMoneyOffCsred size={50}  />} />
      </div>

      <div className=" w-full flex flex-grow flex-wrap lg:flex-nowrap gap-6 px-6  ">
        <div className="shadoww w-full lg:max-w-[66%]  h-fit bg-white p-4 rounded-lg">   <RequestsTable
        data={aids}
        filteredColumn="id"
        columns={cols}
      /></div>
        <div  className="shadoww w-full lg:max-w-[32%]  h-fit bg-white p-4 rounded-lg">test</div>
      </div>
    </div>
  );
}

export default TresaurierDashboard;
