import Axios from "./axios";
import { toast } from "sonner";

const getRecords = async () => {
  try {
    const response = await Axios.get("funds/");
    return response.data ;
  } catch (error) {
    console.log(error);
  }
};

const addRecord = async (record) => {
  try {
    const response = await Axios.post("funds/" , {...record});
    return response.data ;
  } catch (error) {
    console.log(error);
  }
};
 export  {getRecords , addRecord}
