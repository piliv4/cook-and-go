import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import { getAllBebidas } from "@/api/bebida";
import { Categoria } from "@/types/Categoria";
import { getAllCategorias } from "@/api/categoria";
import { useState } from "react";
import BebidaCard from "@/components/admins/bebida/BebidaCard";
import { Bebida } from "@/types/Bebida";
import CrearBebidaCard from "@/components/admins/bebida/CrearBebidaCard";

export async function getServerSideProps() {
  let categorias = await getAllCategorias();
  let bebidas = await getAllBebidas();
  return {
    props: {
      categorias: categorias,
      bebidas: bebidas as Bebida[],
    },
  };
}

export default function BebidaPage({
  bebidas,
  categorias,
}: {
  bebidas: Plato[];
  categorias: Categoria[];
}) {
  const [bebidasFiltradas, setBebidasFiltradas] = useState(bebidas);
  return (
    <div className="flex flex-col gap-4">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">Todos mis bebidas</h1>
        <select
          className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"
          onChange={(e) => {
            const bebidasFiltradasAux = bebidas.filter(
              // @ts-ignore
              (bebida) => bebida.categoria_id === e.target.value
            );
            setBebidasFiltradas(bebidasFiltradasAux);
          }}
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <Buscador />
      </CabeceraPagina>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
        <CrearBebidaCard />
        {bebidasFiltradas.map((bebida) => (
          <BebidaCard bebida={bebida} key={bebida.id} />
        ))}
      </div>
    </div>
  );
}
