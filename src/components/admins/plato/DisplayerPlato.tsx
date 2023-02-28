import { Plato } from "@/types/types";
import CrearPlatoCard from "./CrearPlatoCard";
import PlatoCard from "./PlatoCard";

const DisplayerPlato = ({ platos }: { platos: Plato[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
      {platos.map((plato) => (
        <PlatoCard plato={plato} key={plato.id} />
      ))}
      <CrearPlatoCard />
    </div>
  );
};
export default DisplayerPlato;
