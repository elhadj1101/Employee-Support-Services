import Axios from "./axios";
import {  toast } from 'sonner'
const getLoans = async () => {
  try {
    const response = await Axios.get('/requests/loans/history/');
    const data = response.data;
    if (data.map ){

      let dat = data.map((loan, ind) => { 
          loan["type"] = "Loan";
          loan["start_loan_date"] = loan["request_created_at"];
          return loan;
        });
      return dat;
    }else {
      return [];
    }
  } catch (error) {
    if (error.response){
      toast.error(error.response.data?.detail);

      return [];
    }else{
      console.log(error)
    toast.error("Une erreur s'est produite lors de la récupération des prets.");
    return [];
    }

};
}
const getAids = async () => {
  try {
    const response = await Axios.get('/requests/financial-aids/history/');
    const data = response.data;
    if (data.map ){
      return data;
    }else {
      return [];
    }
  } catch (error) {
    if (error.response){
      toast.error(error.response.data?.detail);
      console.log(error.response);
      return [];
    }else{
      console.log(error)
    toast.error("Une erreur s'est produite lors de la récupération des aides financieres.");
    return [];
    }

};
}

export { getLoans , getAids};