import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from 'Components/layout/Sidebar';
import Navbar from 'Components/layout/Navbar';
import Card from 'Components/Card'
import { useState } from 'react';

const Loan = () => {
    const [Montant, setMontant] = useState("");
    const [Duration, setDuration] = useState("");
    const [MontantError, setMontantError] = useState("");
    const [DurationError, setDurationError] = useState("");
    const [open, setOpen] = useState(false);


    const toggleSidebar = () => {
        setOpen(!open);
    };
 const hideSidebar = () => {
        setOpen(false);
    };







    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Montant.trim()) {
            setMontantError("This field is required.");
        } else if (!/^\d{1,10}$/.test(Montant)) {
            setMontantError("Invalid field format.");
        } else {
            setMontantError("");
        }
        if (!Duration.trim()) {
            setDurationError("This field is required.");
        } else if (!/^\d{1,2}$/.test(Duration)) {
            setDurationError("Invalid field format.");
        } else {
            setDurationError("");
        }
    };
    return (
        <div className=" ">
            <div className={`   ${open ? ' fixed top-0 -translate-x-full' : ' hidden  lg:block '}`}>
                <Sidebar />
            </div>

            <div className=" lg:ml-[250px] flex flex-col h-screen   ">
                <div className=' ml-16 flex items-center cursor-pointer ml-3    '>
                    <img className=' h-7 w-7 lg:hidden  ' src="/icons/menu.png" alt="" onClick={toggleSidebar} />
                    <Navbar />
                </div>

                <div onClick={hideSidebar} className='  bg-slate-200 h-full'>
                    <h1 className=' ml-6 text-2xl font-medium my-2'>Demande Loan</h1>
                    <div className=' max-w-xs mx-auto sm:flex sm:justify-between sm:mx-10 sm:space-x-3 sm:max-w-full    '>
                        <Card

                            title="Mantant max prét"
                            price={5000}
                        />
                        <Card
                            title="Max paiment/mois"
                            price={500} />
                        <Card
                            title="éligible au prét?"
                            isEligable={true} />
                    </div>
                    <div className=' sm:flex m-4 md:flex m-4 lg:flex m-4'>
                        <span className=' font-semibold'>Remarque:</span>
                        <p className=' text-md items-center'>Ces chiffres et informations basés sur votre salaire et le fonds de la communauté </p>
                    </div>

                    <form className=" h-auto bg-slate-50 mx-5 rounded-xl p-4" >
                        <span className=" sm:ml-5 sm:mt-8 font-medium    text-xl flex mb-7 ">Nouvelle demande de prét</span>
                        <label htmlFor="Montant" className=" sm:flex sm:ml-5 sm:mt-7 sm:mb-1    ">Montant demandé</label>
                        <input
                            className="  sm:flex  sm:ml-5 w-[900px]   "
                            value={Montant}
                            type='number'
                            onChange={(e) => setMontant(e.target.value)}
                            style={{ borderColor: MontantError ? "red" : "" }}
                        />
                        <p className='error font-light text-red-600 sm:ml-5'>{MontantError}</p>

                        <label htmlFor="durée" className=" sm:flex sm:mt-8 sm:ml-5 sm:mb-1  ">Durée de remboursement souhaitée</label>
                        <input
                            className="  sm:flex sm:ml-5 w-[900px]   "
                            value={Duration}
                            type='number'
                            onChange={(e) => setDuration(e.target.value)}
                            style={{ borderColor: DurationError ? "red" : "" }}
                        />
                        <p className='error font-light text-red-600 sm:ml-5'>{DurationError}</p>
                        <button onClick={handleSubmit} className=' sm:mt-5 sm:ml-5 bg-blue-900 text-white w-36 py-2 rounded-lg'>Vérifier</button>

                    </form>

                </div>

            </div>

        </div >
    );
}

export default Loan;
