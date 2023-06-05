import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import { getAllPlatos } from "@/api/plato";
import { Categoria } from "@/types/Categoria";
import { getAllCategorias } from "@/api/categoria";
import { useState } from "react";

export async function getServerSideProps() {
  let categorias = await getAllCategorias();
  let platos = await getAllPlatos();
  return {
    props: {
      categorias: categorias,
      platos: platos as Plato[],
    },
  };
}

export default function PlatoPage({
  platos,
  categorias,
}: {
  platos: Plato[];
  categorias: Categoria[];
}) {
  const [platosFiltrados, setPlatosFiltrados] = useState(platos);
  return (
    <div className="flex flex-col gap-4">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">Todos mis platos</h1>
        <select
          className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"
          onChange={(e) => {
            if (e.target.value !== "-1") {
              const platosFiltradosAux = platos.filter(
                // @ts-ignore
                (plato) => plato.categoria_id === e.target.value
              );
              setPlatosFiltrados(platosFiltradosAux);
            } else {
              setPlatosFiltrados(platos);
            }
          }}
        >
          <option value={"-1"}>Todas mis categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <Buscador />
      </CabeceraPagina>
      <DisplayerPlato platos={platosFiltrados} />
    </div>
  );
}
