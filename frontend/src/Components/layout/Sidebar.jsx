import React from "react";
import SideButton from "./SideButton";
import { HiOutlineUserGroup, HiOutlineUserPlus } from "react-icons/hi2";
import { FaCircleCheck } from "react-icons/fa6";
import { FaHandsHelping, FaPiggyBank } from "react-icons/fa";
import useStore from "../../store/index.js";
export default function Sidebar() {
  const { user } = useStore();
  return (
    <div className="w-[250px] fixed top-0 h-screen sidebar ">
      <div className="  bg-gradient-to-b flex flex-col from-[#131C55] to-[#131c556a] w-full h-screen ">
        {user && user.is_superuser && (
          <SideButton
            title="utilisateurs"
            icon={HiOutlineUserGroup}
            nestedBtns={[
              {
                titleBtn: "liste des utilisateurs",
                path: "utilisateurs",
                Icon: HiOutlineUserGroup,
              },
              {
                titleBtn: "add utilisateur",
                path: "utilisateurs/add-user",
                Icon: HiOutlineUserPlus,
              },
            ]}
          />
        )}
        {user && !user.is_superuser && (
          <>
            <SideButton
              title="Dashboard"
              icon={HiOutlineUserGroup}
              nestedBtns={[]}
            />
            <SideButton
              title="Demande Pret"
              icon={FaPiggyBank}
              nestedBtns={[
                {
                  titleBtn: "Faire une Demande",
                  path: "demande-pret",
                  Icon: HiOutlineUserPlus,
                },
                {
                  titleBtn: "Votre Demandes",
                  path: "liste-demandes-pret",
                  Icon: FaCircleCheck,
                },
              ]}
            />
            <SideButton
              title="Demande Aide Financiere"
              icon={FaHandsHelping}
              nestedBtns={[
                {
                  titleBtn: "Faire une Demande",
                  path: "demande-aide-financiere",
                  Icon: HiOutlineUserPlus,
                },
                {
                  titleBtn: "Votre Demandes",
                  path: "liste-demandes-aide-financiere",
                  Icon: FaCircleCheck,
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
