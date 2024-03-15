import React from 'react'
import SideButton from './SideButton'
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUserPlus } from "react-icons/hi2";

export default function Sidebar() {
  return (
    <div className='w-[250px] fixed top-0 h-screen sidebar '>
        <div className="  bg-gradient-to-b flex flex-col from-[#131C55] to-[#131c556a] w-full h-screen ">
            <SideButton title='utilisateurs' icon={HiOutlineUserGroup} nestedBtns={[{titleBtn:'liste des utilisateurs',path:'utilisateurs' , Icon:HiOutlineUserGroup} , {titleBtn:'add utilisateur',path:'utilisateurs/add-user' ,  Icon:HiOutlineUserPlus }]} />
        </div>
       
    </div>
  )
}
