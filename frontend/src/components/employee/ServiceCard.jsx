import { Button } from "components/ui/button";
import React, { ReactNode } from "react";
import { Fa0 } from "react-icons/fa6";
import { Link } from "react-router-dom";
function ServiceCard({
  title = "Demander un pret",
  description = "Demandez un prêt et remboursez-le sur une période maximale de 12 mois.",
  icon = Fa0,
  classes = "",
  btnText = "Prend votre prêt",
  linkTo =""
}) {
  return (
    <div
      className={
        "flex flex-row bg-light-blue text-white p-6 rounded-xl  min-h-[222px] " +
        classes
      }
    >
      <div className="flex flex-col justify-around items-start basis-2/3">
        <div className="text-xl lg:text-2xl font-bold">{title}</div>
        <div className="text-sm lg:text-md mb-3">{description}</div>
        <div>
          <Button asChild className="bg-white px-8 py-5 text-md text-blue-950 hover:bg-white hover:text-blue-950 font-semibold">
            <Link to={linkTo}>{btnText}</Link>
          </Button>
        </div>
      </div>
      <div className="basis-1/3 flex mb-0 justify-end items-center">{icon}</div>
    </div>
  );
}

export default ServiceCard;
