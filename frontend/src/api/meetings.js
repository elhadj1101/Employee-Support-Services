import { toast } from "sonner";
import Axios from "./axios";

const getMeetings = async () => {
  try {
    const response = await Axios.get("/meetings");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const addMeeting = async ({
  title,
  day,
  description,
  start_time,
  end_time,
  link,

  canceled = false,
}, HandleOpen , refresh) => {
  try {
    const response = await Axios.post("/meetings/", {
      title,
      day,
      description,
      start_time,
      end_time,
      link,
      canceled,
    });
    console.log(response.data);
    toast.success('La réunion a été créée avec succès.')
    HandleOpen();
    refresh();
    return response.data;
  } catch (error) {
    toast.error(error.response.data["non_field_errors"][0])
  }
};

export { getMeetings, addMeeting };
