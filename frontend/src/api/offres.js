import Axios from "./axios";
import {  toast } from 'sonner'

const getOffres = async () => {
  try {
    const response = await Axios.get('/offres/');
    const data = response.data;
     return data;
  } catch (error) {
    if (error.response){
      toast.error(error.response.data?.detail);

      console.log(error.response.data);
      return [];
    }else{
    toast.error("Une erreur s'est produite lors de la récupération des données.");
    return [];
    }

};
}

export { getOffres };