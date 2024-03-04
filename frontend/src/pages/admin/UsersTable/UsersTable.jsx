import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";

function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function UsersTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    
    setData(getData());
    
  }, [data]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
