import Axios from "./axios";
import {  toast } from 'sonner'

const getLoans = async () => {
  try {
    const response = await Axios.get('/requests/loans/history/');
    const data = response.data;
    if (data.map ){

      let dat = data.map((loan, ind) => { 
          loan["id"] = ind;
          loan["type"] = "Loan";
          loan["start_loan_date"] = "2024-03-12";
          return loan;
        });
      return dat;
    }else {
      return [];
    }
  } catch (error) {
    if (error.response){
      // toast.error(error.response.data?.detail);

      console.log(error.response);
      return [];
    }else{
      console.log(error)
    toast.error("Une erreur s'est produite lors de la récupération des données.");
    return [];
    }

};
}

export { getLoans };