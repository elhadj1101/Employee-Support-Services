import Axios from "./axios";
import { toast } from "sonner";
import { groupBy } from "components/utils/utilFunctions";

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
  console.log(response.data);
  toast.success('Enregistrement ajouté avec succès');
    return response.data ;
  
  } catch (error) {
    toast.error(error.response.data.error);
  }
};


const getAnalitics = async(year,week="", period="monthly", total=false, aid=false) =>{
   try {
    const response = await Axios.get(`funds/analitics/?${(period && "period="+period+"&") || ""}${(year && "year="+year+"&") || ""}${(week && "week="+ week+"&") || ""}${"aids="+aid+"&"}${"total="+total}` );
    return response.data ;
  } catch (error) {
    console.log(error);
  }
};
async function fetchAnalitics(setAnaliticsByMonth,year=null, week=null, period="monthly") {
  console.log(year, week, period);
      let dat = await getAnalitics(year, week, period);
      if (period === "monthly") {
        dat = groupBy(dat, "created_at__month");
      let months = [1,2,3,4,5,6,7,8,9,10,11,12]
      months.forEach((e) => {
        if (!dat[e]){
          dat[e] = {
            total_expense: 0,
            total_income: 0,
          };
        }else{
          dat[e] = {...dat[e][0]}
        }
      })
      }else if (period === "weekly") {
        dat = dat.map((e) => {
          var dateObj = new Date(e.created_at)
          var weekday = dateObj.toLocaleString("default", { weekday: "long" })
          return {...e, weekday: weekday}
        })
        dat = groupBy(dat, "weekday");
        let days =  ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
        days.forEach((e) => {
           
          if (!dat[e]){
            dat[e] = {
              total_expense: 0,
              total_income: 0,
            };
          }else{
            dat[e] = {...dat[e][0]}
          }
        })
      }
      setAnaliticsByMonth(dat)
    }

async function fetchDoghnouts(setDoghnoutsData,year=null,total=true,aid=false) {
      let dat = await getAnalitics(year,"" ,"",total,aid);
      setDoghnoutsData(dat)
    }
export  {getRecords , addRecord, getAnalitics, fetchAnalitics,fetchDoghnouts}