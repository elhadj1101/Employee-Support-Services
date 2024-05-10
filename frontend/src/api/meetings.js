import Axios from "./axios";

const getMeetings = async () => {
  try {
    const response = await Axios.get('/meetings');
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export {getMeetings}