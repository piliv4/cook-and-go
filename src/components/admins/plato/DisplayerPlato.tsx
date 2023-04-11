import { Plato } from "@/types/types";
import { useState } from "react";
import CrearPlatoCard from "./CrearPlatoCard";
import CrearPlatoPopUp from "./CrearPlatoPopUp";
import PlatoCard from "./PlatoCard";
import { useRouter } from "next/router";

const DisplayerPlato = ({ platos }: { platos: Plato[] }) => {
  const router = useRouter();
  const categoriaURI = router.query;
  const categoriaAux = categoriaURI?.id ? categoriaURI.id.toString() : "";
  const platoVacio = {
    nombre: "",
    descripcion: "",
    categoria: categoriaAux,
    precio: 0,
    id: "",
    ingredientes: [],
    imagenURL: "",
  };
  const [open, setOpen] = useState(false);
  const [plato, setPlato] = useState<Plato>(platoVacio);
  function cerrarPopUp() {
    setPlato(platoVacio);
    setOpen(false);
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
      {platos.map((plato) => (
        <PlatoCard
          plato={plato}
          key={plato.id}
          abrirPopUp={() => setOpen(true)}
          setPlatoEditar={setPlato}
        />
      ))}
      <CrearPlatoCard abrirPopUp={() => setOpen(true)} />

      <CrearPlatoPopUp
        platoEditar={plato}
        cerrarPopUp={() => cerrarPopUp()}
        open={open}
      />
    </div>
  );
};
export default DisplayerPlato;
