import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import supabase from "@/server/client";
import { Ingrediente, Plato } from "@/types/types";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let ingredientes: any[] = [];
  let { data: plato } = await supabase
    .from("Articulo")
    .select("*")
    .eq("id", id);
  let { data: ingredientesId } = await supabase
    .from("ArticuloIngrediente")
    .select("ingrediente_id")
    .eq("articulo_id", id);
  if (ingredientesId != null) {
    for (const id of ingredientesId) {
      let { data: ingrediente } = await supabase
        .from("Ingrediente")
        .select("*")
        .eq("id", id.ingrediente_id);
      ingrediente && ingredientes.push(ingrediente[0] as Ingrediente);
    }
  }
  return {
    props: {
      plato: plato && (plato[0] as Plato),
      ingredientes: ingredientes as Ingrediente[],
    },
  };
};

const DetallesPlato = ({
  plato,
  ingredientes,
}: {
  plato: Plato;
  ingredientes: any[];
}) => {
  return (
    <div className="mx-48">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">{plato.nombre}</h1>
      </CabeceraPagina>
      {/* Información general */}
      <div className="grid grid-cols-2 pt-2">
        <div>{/* IMAGEN */}</div>
        <div>
          <div className="grid grid-cols-2">
            <p>Nombre:</p>
            <h1>{plato.nombre}</h1>
          </div>
          <div className="grid grid-cols-2">
            <p>Descripción:</p>
            <p>{plato.descripcion}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Categoria:</p>
            <p>{plato.categoria}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Precio:</p>
            <p>{plato.precio}</p>
          </div>
        </div>
      </div>
      {/* Mis ingredientes */}
      <div className="flex flex-col gap-y-4">
        <div className="pb-1 border-primaryGreen border-b-[2px] text-xl font-black">
          Ingredientes:
        </div>
        {ingredientes.length > 0 ? (
          ingredientes.map((ingrediente, index) => (
            <div
              key={ingrediente.id}
              className="flex flex-row border-b-[2px] border-primaryOrange border-dotted"
            >
              <p className="w-full">
                {index + 1}. {ingrediente.nombre}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            este plato no tiene ingredientes
          </div>
        )}
      </div>
    </div>
  );
};

export default DetallesPlato;
