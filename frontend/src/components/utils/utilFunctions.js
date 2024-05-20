function formatPrice(price, delm=".") {
    if (price === undefined || price === null) {
      return "0";
    }
    let strPrice = price.toString();
    if (isNaN(strPrice)) {
        return "0";
    }
    let rest = ""
    if (strPrice.includes(".")) {
        rest = strPrice.slice(strPrice.indexOf("."));
        strPrice = strPrice.slice(0, strPrice.indexOf("."));
    }
    let newPrice = ""
    for (let i =strPrice.length-1; i>=0 ; i-- ){
        //every 3 letters add a delm
        if ((strPrice.length - i -1) % 3 === 0 ) {
            newPrice = delm + newPrice;
        }
        newPrice = strPrice[i]+newPrice;
    }

    // if (newPrice.split(".").length  === 2) {
    //     let afterDellm = newPrice.split(".")[1].slice(0, 2);
    //     newPrice = newPrice.split(".")[0] + "." + afterDellm;
    //     
        
    // }
    rest = rest.slice(0,3)
    return newPrice.charAt(newPrice.length-1) == delm ?  newPrice.slice(0, -1)+rest : newPrice+rest;
}


const groupBy = (arr, prop) =>
  arr.reduce((acc, val) => {
    ;(acc[val[prop]] = acc[val[prop]] || []).push(val)
    return acc
  }, {})

function weekNumber(date = new Date())
{
  var firstJanuary = new Date(date.getFullYear(), 0, 1);
  var dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
  var weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
  return weekNr;
}

const formatTime = (time) => {
  return time.split(":")[0] + ":" + time.split(":")[1];
};


export {formatPrice, groupBy, weekNumber, formatTime}

