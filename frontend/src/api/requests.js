import Axios from "./axios";
import {  toast } from 'sonner'

const statusColorMap = {
  approved: "text-green-900 bg-green-100",
  waiting: "text-yellow-900 bg-yellow-100",
  refused: "text-red-900 bg-red-100",
  admin: "text-gray-900 bg-gray-100",
  finished: "text-blue-900 bg-blue-100",
  payment_started: "text-teal-900 bg-teal-100",
};
const financial_aid_infos = [
    {
      name: "family_member_death",
      category: "Décès",
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
      category: "Décès",
      description: "Décès de l'employé",
      types: {
        retired: {
          name: "retired",
          desc: "Retraité",
          amount: 50000,
        },
        non_retired: {
          name: "non_retired",
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
      category: "Les Prestations",
      description: "Naissance d'un fils",
      files: ["Attestation de travail", "Acte de naissance n°12 de l'enfant"],
      amount: 10000,
    },
    {
      name: "mariage",
      category: "Les Prestations",
      description: "Mariage",
      files: ["Attestation de travail", "Contrat de mariage"],
      amount: 20000,
    },
    {
      name: "circumcision_newborn",
      category: "Les Prestations",
      description: "Circoncision d'un nouveau-né",
      files: [
        "Attestation de travail",
        "Certificat de circoncision d'un nouveau-né",
      ],
      amount: 7000,
    },
    {
      name: "retirement_financial_aid",
      category: "Les Prestations",
      description: "Retraite",
      files: [
        "Attestation de suspension de salaire",
        "Une copie de la décision de saisine en retraite ou de la décision de rupture de contrat pour cause de départ à la retraite.",
        "Une copie de l'attestation de notification de départ à la retraite.",
      ],
      amount: 70000,
    },
    {
        name: 'surgeries',
        category: "Les Services De Solidarité",
        description: 'les opérations chirurgicales',
        files: [
          "Attestation de travail",
          "Un rapport médical diagnostiquant la maladie et nécessitant une intervention chirurgicale.",
          "Facture de l'opération avec les spécifications légales.",
          "Attestation de non-affiliation à la Caisse nationale des travailleurs salariés ou d'affiliation pour les non-salariés (pour les parrains de plus de 21 ans).",
          "Certificat de famille ou attestation d'acquisition de droits extraits de la sécurité sociale (pour les parrains de plus de 21 ans).",
          "Certificat de non-mariage pour une fille de plus de 21 ans."
        ],
        amount: 0,
        amountNotes : ["La Comité fournit une aide financière de 25 % du coût des interventions chirurgicales inférieures à 150 000DA.",
              "La subvention concerne le personnel scolaire et les enseignants, les enfants mineurs jusqu'à l'âge de 21 ans, les filles jusqu'au mariage et les conjoints qui ne cotisent pas à la sécurité sociale.",
              "La subvention pour les actifs est de 10 %.",
              "La prise en charge des césariennes est plafonnée à 50 000DA.",
              "Les interventions chirurgicales prises en charge par la Caisse nationale de sécurité sociale ne sont pas remboursées à 100 %."
            ]
    },
    {
        name: 'mineral_baths',
        category: "Les Services De Solidarité",
        description: 'Bains minéraux',
        files: [
          "Attestaion de travail",
          "Un rapport médical spécifiant la nécessité d'un traitement par un médecin spécialisé.",
          "La facture de l'opération avec les spécifications légales."
        ],
        amount: 0,
        amountNotes: [
          "Le comité remboursera 25 % de la valeur des cures thermales qui ne dépassent pas 50 000DA",
        ]
    },
    {
        name: 'accident_and_disasters',
        category: "Les Services De Solidarité",
        description: 'Assistance en cas d\'accident Et les catastrophes',
        files: [
              "Attestation de travail",
              "Une attestation de la victime ou un rapport d'intervention fourni par les autorités compétentes.",
              "Une fiche technique d'un expert pour présenter l'importance des pertes.",
              "Un rapport d'inspection préparé par la commission."
        ],
        amount: 0,
        amountNotes: [
             "Le comité fournit une assistance financière aux employés et enseignants de l'école qui sont touchés par des accidents d'urgence ou des catastrophes naturelles.",
              "La valeur de l'aide financière est estimée à un maximum de 50 000DA."
        ]
    },
    {
        name: 'social_and_health_aid',
        category: "Les Services De Solidarité",
        description: 'Aide aux conditions sociales et sanitaires',
        files: [
          "Attestation de travail",
           "Certificats et documents prouvant le besoin d'assistance.",
            "Procès-verbal préparé par le comité."
        ],
        amountNotes:[
            "Le Comité accorde une aide financière au personnel scolaire et aux enseignants qui en ont besoin, sous réserve de l'appréciation du Comité.",
            "La valeur de l'aide financière est limitée à un maximum de 50 000DA."
        ],
        amount: 0
    }
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
      ;
      return [];
    }else{
      
    toast.error("Une erreur s'est produite lors de la récupération des aides financieres.");
    return [];
    }

};
}

const getAllAids = async () => {
  try {
    const response = await Axios.get('/requests/financial-aids/');
    const data = response.data;
    if (data.map){
      return data;
    }else {
      return [];
    }
  } catch (error) {
    if (error.response){
      if (error.response.data){
        if (error.response.data.detail){
          toast.error(error.response.data.detail);
        }else if (error.response.data.error){
        toast.error(error.response.data.error);
          
        }else {
          toast.error("Une erreur s'est produite lors de la récupération des aides financieres.");
        
        }
      }
      
      return [];
    }else{
      
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
      if (error.response.data){
        if (error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error(
            "Une erreur s'est produite lors de la récupération des prets."
          );
        }
      }
      return [];
    }else{
      
    toast.error("Une erreur s'est produite lors de la récupération des prets.");
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
      if (error.response.data){
        if (error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error(
            "Une erreur s'est produite lors du fait de demande."
          );
        }
      }else{
        toast.error(
          "Une erreur s'est produite lors du fait de demande."
        );
      }
      ;
      return "False";
    }else{
      
    toast.error("Une erreur s'est produite lors de la connexion.");
    return "False";
    }

};
}

const deleteLoan = async (id) => {
  try {
    const response = await Axios.delete(`/requests/loans/${id}`);
    return true;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.detail) {
          toast.error(error.response.data.detail);
        } else if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Une erreur s'est produite lors de la suppression du pret.");
        }
      } else {
        toast.error("Une erreur s'est produite lors de la suppression du pret.");
      }
      return "False";
    } else {
      toast.error("Une erreur s'est produite lors de la connexion.");
      return "False";
    }

};

}
const deleteAid = async (id) => {
  try {
    const response = await Axios.delete(`/requests/financial-aids/${id}`);
    return true;
  } catch (error) {
    if (error.response){
      toast.error(error.response.data?.detail);
      ;
      return false;
    }else{
      
    toast.error("Une erreur s'est produite lors de la suppression du pret.");
    return  false;
    }

};

}

const updateStatus = async (id, type, newStatus) => {
  try {
    const response = await Axios.patch(`/requests/commite/${type}/${id}`, {new_status: newStatus});
    return response.data?.success || false;
  } catch (error) {
    if (error.response){
      if (error.response.data){
        if ( error.response.data.detail){
          toast.error(error.response.data);
        }
        else if (error.response.data.error){
          toast.error(error.response.data.error);
        }
      }else{
        toast.error("Une erreur s'est produite lors de la mise à jour du statut.");
        ;
      }
      return false;
    }else{
      
    toast.error("Une erreur s'est produite lors de la mise à jour du statut.");
    return  false;
    }

};


}

const getCommity = async ()=>{
  try{
    const response = await Axios.get('/funds/commity/1/');
    return response.data;
  }catch(error){
    if (error.response){
      if (error.response.data){
        if (error.response.data.detail){
          toast.error(error.response.data.detail);
        }else if (error.response.data.error){
          toast.error(error.response.data.error);
        }else{
          toast.error("Une erreur s'est produite lors de la récupération des données.");
        }
      }else{
        toast.error("Une erreur s'est produite lors de la récupération des données.");
      }
      return [];
    }else{
      
    toast.error("Une erreur s'est produite lors de la récupération des données.");
    return [];
    }
  }

}
export { getLoans , getAids, financial_aid_infos,
    statusColorMap, getAllAids, getAllLoans,
    canApplyForLoan, deleteLoan, deleteAid,
    updateStatus , getCommity};