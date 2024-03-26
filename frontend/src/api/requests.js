import Axios from "./axios";
import {  toast } from 'sonner'

const statusColorMap = {
  approved: "text-green-900 bg-green-100",
  waiting: "text-yellow-900 bg-yellow-100",
  refused: "text-red-900 bg-red-100",
  admin: "text-gray-900 bg-gray-100",
};
const financial_aid_infos = [
    {
      name: "family_member_death",
      description: "Décès d'un membre de famille",
      files: [
        "Attestation de travail",
        "Un chèque postal barré au nom du bénéficiaire",
      ],
      types: {
        wife: {
          name: "wife",
          desc: "Épouse/Mari",
          amount: 70000,
          files: [
            "Acte de décès du mari/epouse",
            "Certificat de famille pour le travailleur",
          ],
        },
        son: {
          name: "son",
          desc: "Fils",
          amount: 70000,
          files: ["Acte de décès du fils", "Acte de naissance n°12 du défunt"],
        },
        parent: {
          name: "parent",
          desc: "Parent",
          amount: 40000,
          files: ["Acte de décès du père", "Acte de famille du père"],
        },
      },
    },
    {
      name: "employee_death",
      description: "Décès de l'employé",
      types: {
        retired: {
          name: "retired",
          desc: "Retraité",
          amount: 50000,
        },
        non_retarder: {
          name: "non_retarder",
          desc: "Non retraité",
          amount: 100000,
          note: "La durée pendant laquelle il doit être à la retraite est de maximum 3 ans avant le décès pour bénéficier de l'aide",
        },
      },
      files: [
        "Attestation de travail ou copie de la décision de mise en retraite",
        "Acte de décès du travailleur",
        "Acte de naissance n°12 pour le défunt, une copie du PT national pour le déclarant",
        "Un chèque postal barré au nom du bénéficiaire",
      ],
    },
    {
      name: "child_birth",
      description: "Naissance d'un fils",
      files: ["Attestation de travail", "Acte de naissance n°12 de l'enfant"],
      amount: 10000,
    },
    {
      name: "mariage",
      description: "Mariage",
      files: ["Attestation de travail", "Contrat de mariage"],
      amount: 20000,
    },
    {
      name: "circumcision_newborn",
      description: "Circoncision d'un nouveau-né",
      files: [
        "Attestation de travail",
        "Certificat de circoncision d'un nouveau-né",
      ],
      amount: 7000,
    },
    {
      name: "retirement",
      description: "Retraite",
      files: [
        "Attestation de suspension de salaire",
        "Une copie de la décision de saisine en retraite ou de la décision de rupture de contrat pour cause de départ à la retraite.",
        "Une copie de l'attestation de notification de départ à la retraite.",
      ],
      amount: 70000,
    },
  ];


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

const getAllAids = async () => {
  try {
    const response = await Axios.get('/requests/financial-aids/');
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
const getAllLoans = async () => {
  try {
    const response = await Axios.get('/requests/loans/');
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

const canApplyForLoan = async () => {
  try {
    const response = await Axios.get('/requests/loans/check/');
    return response.data;
  } catch (error) {
    if (error.response){
      toast.error(error.response.data?.detail);
      console.log(error.response);
      return "False";
    }else{
      console.log(error)
    toast.error("Une erreur s'est produite lors de la connexion.");
    return "False";
    }

};
}
export { getLoans , getAids, financial_aid_infos, statusColorMap, getAllAids, getAllLoans, canApplyForLoan};