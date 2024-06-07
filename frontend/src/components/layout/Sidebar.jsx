import React from "react";
import SideButton from "./SideButton";
import { HiOutlineUserGroup, HiOutlineUserPlus } from "react-icons/hi2";
import { HiClipboardList } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { FaHandsHelping, FaPiggyBank } from "react-icons/fa";
import useStore from "../../store/index.js";
import { canViewRequests } from "api/auth";
import { Link } from "react-router-dom";
import { GrList } from "react-icons/gr";
import { GiTabletopPlayers } from "react-icons/gi";
import { MdOutlineSell } from "react-icons/md";
export default function Sidebar() {
  const { user } = useStore();
  return (
    <div className="w-[235px] fixed top-0  h-screen sidebar ">
      <div className=" pt-20 bg-gradient-to-b flex flex-col from-[#131C55] to-[#131c556a] w-full h-screen ">
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
        {user && (
          <>
            <Link to="/">
              <SideButton
                title="Dashboard"
                icon={TbLayoutDashboard}
                nestedBtns={[]}
                to="/"
              />
            </Link>
            <SideButton
              title="Demande Pret"
              icon={FaPiggyBank}
              nestedBtns={[
                {
                  titleBtn: "Faire une Demande",
                  path: "demande-pret",
                  Icon: HiClipboardList,
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
                  Icon: HiClipboardList,
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
        {user && canViewRequests.includes(user.role) && (
          <>
            <Link to="/demandes-employe">
              <SideButton
                title="Demande Des Employés"
                icon={GrList}
                nestedBtns={[]}
                to="/demandes-employe"
              />
            </Link>
          </>
        )}
        {user && user.role !== "employe" && (
          <Link to="/reunions">
            <SideButton
              title="Les Réunions"
              icon={GiTabletopPlayers}
              nestedBtns={[]}
              to="/reunions"
            />
          </Link>
        )}
        {user &&
          (user.role === "president" || user.role === "vice_president") && (
            <Link to="/offres">
              <SideButton
                title="Les offres"
                icon={MdOutlineSell}
                nestedBtns={[
                  {
                    titleBtn: "Creer Un Offre",
                    path: "/create-offre",
                    Icon: HiClipboardList,
                  },
                  {
                    titleBtn: "Liste Des Offres",
                    path: "/offres",
                    Icon: FaCircleCheck,
                  },
                ]}
              />
            </Link>
          )}
      </div>
    </div>
  );
}
