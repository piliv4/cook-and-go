import { Ingrediente } from "@/types/Ingrediente";
import { getAllIngredientes } from "@/api/ingrediente";
import CrearIngrediente from "@/components/admins/ingrediente/CrearIngrediente";
import Buscador from "@/components/admins/ui/Buscador";
import IngredienteTable from "@/components/admins/ingrediente/IngredienteTable";
import { useState } from "react";

export async function getServerSideProps() {
  const ingredientes = await getAllIngredientes();
  return {
    props: {
      ingredientes: ingredientes,
    },
  };
}

export default function IngredientesPagina({
  ingredientes,
}: {
  ingredientes: Ingrediente[];
}) {
  const [index, setIndex] = useState(0);
  const [ingredientesMostrar, setIngredientesMostrar] = useState(
    ingredientes.slice(0, 11)
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">Mis ingredientes</h1>
        <Buscador />
      </div>
      <CrearIngrediente />
      <IngredienteTable ingrediente={ingredientesMostrar} />
      <div className="text-white flex flex-row">
        {index > 0 && (
          <div className="w-full flex ">
            <button
              className="rounded-full bg-primaryOrange font-black px-4 py-1 hover:bg-secondaryOrange"
              onClick={() => {
                let nextIndex;
                index - 11 < 0 ? (nextIndex = 0) : (nextIndex = index - 11);
                setIndex(nextIndex);
                setIngredientesMostrar(
                  ingredientes.slice(nextIndex, nextIndex + 11)
                );
              }}
            >
              Anterior
            </button>
          </div>
        )}
        {index < ingredientes.length && (
          <div className="w-full flex justify-end">
            <button
              className="rounded-full bg-primaryOrange font-black px-4 py-1 hover:bg-secondaryOrange"
              onClick={() => {
                let nextIndex;
                index + 11 > ingredientes.length
                  ? (nextIndex = ingredientes.length)
                  : (nextIndex = index + 11);
                setIndex(nextIndex);
                console.log(index + " hasta " + index + 11);

                setIngredientesMostrar(
                  ingredientes.slice(nextIndex, nextIndex + 11)
                );
              }}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
