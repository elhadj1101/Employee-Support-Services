import React from 'react';


const Card = ({ title, price, isEligable }) => {

    return (
        <div className=' h-28    sm:h-28 sm:w-64 mb-4 flex items-center justify-center bg-slate-50 rounded-lg  '>
            <img className=' mr-2 h-10 w-10 p-2 rounded-full bg-slate-300' src="/icons/work.svg" alt="case" />
            <span className=' flex-col mx-1'>
                <h3>{title}</h3>
                {price && <h3 className=' ml-5 text-blue-900 text-lg font-medium'>{price} DA</h3>}
                {isEligable && !price ? <h2 className=' ml-5 font-semibold text-green-600 '>OUI</h2> : (!isEligable && !price) ? <h2 className=' ml-5'>NON</h2> : null}
            </span>
        </div>
    );
}

export default Card;
