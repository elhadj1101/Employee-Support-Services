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
    return response.data ;
  } catch (error) {
    console.log(error);
  }
};


const getAnalitics = async(year,week, period="monthly") =>{
   try {
    const response = await Axios.get(`funds/analitics/?${(period && "period="+period+"&") || ""}${(year && "year="+year+"&") || ""}${(week && "week="+ week) || ""}` );
    return response.data ;
  } catch (error) {
    console.log(error);
  }
};
async function fetchAnalitics(setAnaliticsByMonth,year=null, week=null, period="monthly") {
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
        let days =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
export  {getRecords , addRecord, getAnalitics, fetchAnalitics}