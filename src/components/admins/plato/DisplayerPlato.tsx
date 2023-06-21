import CrearPlatoCard from "./CrearPlatoCard";
import PlatoCard from "./PlatoCard";
import { Plato } from "@/types/Plato";

const DisplayerPlato = ({ platos }: { platos: Plato[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
      <CrearPlatoCard />
      {platos.map((plato) => (
        <PlatoCard plato={plato} key={plato.id} />
      ))}
    </div>
  );
};
export default DisplayerPlato;
