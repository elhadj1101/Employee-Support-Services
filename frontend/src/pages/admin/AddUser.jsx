import React from 'react'
import Form from '../../Components/utils/Form'
import Navbar from '../../Components/layout/Navbar'

export default function AddUser() {
  return (
    <div className='w-full h-screen'>
        <Navbar path={"Utilisateurs | Ajouter un utilisateur"} />
        <div className='bg-lightgray w-full h-full'>
        <Form/>
        </div>
    </div>
  )
}
