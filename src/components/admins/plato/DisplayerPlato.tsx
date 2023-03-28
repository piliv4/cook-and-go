import { Plato } from "@/types/types";
import { useState } from "react";
import CrearPlatoCard from "./CrearPlatoCard";
import CrearPlatoPopUp from "./CrearPlatoPopUp";
import PlatoCard from "./PlatoCard";

const DisplayerPlato = ({ platos }: { platos: Plato[] }) => {
  const [open, setOpen] = useState(false);
  const [platoEditar, setPlatoEditar] = useState<Plato | null>(null);
  function cerrarPopUp() {
    setOpen(false);
    setPlatoEditar(null);
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
      {platos.map((plato) => (
        <PlatoCard
          plato={plato}
          key={plato.id}
          abrirPopUp={() => setOpen(true)}
          setPlatoEditar={setPlatoEditar}
        />
      ))}
      <CrearPlatoCard abrirPopUp={() => cerrarPopUp()} />

      <CrearPlatoPopUp
        platoEditar={platoEditar}
        cerrarPopUp={() => cerrarPopUp()}
        open={open}
      />
    </div>
  );
};
export default DisplayerPlato;
