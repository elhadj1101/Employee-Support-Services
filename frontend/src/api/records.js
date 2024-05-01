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

 export  {getRecords}
