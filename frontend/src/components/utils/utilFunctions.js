function formatPrice(price, delm=".") {
    
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

    return newPrice.charAt(newPrice.length-1) == delm ?  newPrice.slice(0, -1)+rest : newPrice+rest;
}

export {formatPrice}