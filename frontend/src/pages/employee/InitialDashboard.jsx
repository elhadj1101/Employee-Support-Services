import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "components/ui/button";
import ServiceCard from "components/employee/ServiceCard";
import useStore from "../../store/index.js";
import TresaurierDashboard from "pages/commite/TresaurierDashboard";
import { loanColumns } from "components/employee/Columns/loanColumns";


function InitialDashboard() {
  const { offres, loans, user } = useStore();
  const cols = loanColumns(["employee"]) || [];
  return (
    <div className="px-6 py-4  w-full flex-grow  bg-lightgray  ">
      {offres.length === 0 ? (
        <div className="p-2 text-center">
          Il y a pas des offres pour le moments
        </div>
      ) : (
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {offres.map((offre) => {
              return (
                <CarouselItem key={offre.id} className={" h-[230px]"}>
                  <div className="bg-[#C0CAF8] w-ful h-full  rounded-xl flex flex-wrap md:flex-nowrap justify-between items-center">
                    <div className="text-darkblue basis-full h-full px-7 py-5 md:basis-3/5 lg:basis-2/3 gap-4 flex flex-col justify-center  ">
                      <div className="text-3xl font-bold">
                        {offre.title.toUpperCase()}
                      </div>
                      <div className="font-medium text-lg">
                        {offre.description}
                      </div>
                      <div>
                        <Button
                          asChild
                          className="font-semibold mt-4 bg-white hover:text-blue-950 text-blue-950 hover:bg-white "
                        >
                          <Link to={`/offres/${offre.id}`}>Savoir plus</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white basis-full md:basis-2/5 xl:basis-1/3 h-full rounded-r-xl overflow-hidden rounded-br-xl">
                      <img
                        className="w-full h-full object-cover "
                        src={offre.cover}
                        alt=""
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      )}

      {/* Loan and financial aid cards */}
      {user && user.role !== "tresorier" ? (
        <div className=" mt-6 flex gap-5 flex-wrap lg:flex-nowrap">
          <ServiceCard
            classes="basis-full lg:basis-[50%]"
            icon={
              <img
                className="w-[90px] md:w-[130px]"
                alt=""
                src="/assets/loan-icon.png"
              />
            }
            linkTo="/demande-pret"
          />
          <ServiceCard
            classes="basis-full lg:basis-[50%]"
            title="Demander une aide financière"
            description="Demander une aide financière, pour les raisons suivantes : décès d'un proche, mariage, naissance, décès du l’employé."
            icon={
              <img
                className="w-[90px] md:w-[130px]"
                src="/assets/financial-aid.png"
                alt=""
              />
            }
            btnText="Prend votre Aide"
            linkTo="/demande-aide-financiere"
          />
        </div>
      ) : (
        <TresaurierDashboard />
      )}

      {/* <div className=" mx-6 mb-4  text-2xl font-bold">Dernieres Offres</div> */}
    </div>
  );
}

export default InitialDashboard;
