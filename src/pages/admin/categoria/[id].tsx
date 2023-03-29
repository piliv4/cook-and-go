import Buscador from "@/components/admins/Buscador";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import supabase from "@/server/client";
import { Ingrediente, Plato } from "@/types/types";
import { GetServerSideProps } from "next";
import Link from "next/link";

//NO FUNCIONA >:[

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  let { data: titulo } = await supabase
    .from("Categoria")
    .select("nombre")
    .eq("id", id);

  let { data: platos } = await supabase
    .from("Articulo")
    .select("*")
    .eq("categoria_id", id);
  for (let plato of platos as Plato[]) {
    plato.ingredientes = [];
    let { data: ingredientesId } = await supabase
      .from("ArticuloIngrediente")
      .select("ingrediente_id")
      .eq("articulo_id", plato.id);

    if (ingredientesId != null) {
      for (const id of ingredientesId) {
        let { data: ingrediente } = await supabase
          .from("Ingrediente")
          .select("*")
          .eq("id", id.ingrediente_id);
        ingrediente && plato.ingredientes.push(ingrediente[0] as Ingrediente);
      }
    }
  }
  return {
    props: {
      platos: platos as Plato[],
      titulo: titulo && titulo[0].nombre,
    },
  };
};

const DetallesCategoria = ({
  platos,
  titulo,
}: {
  platos: Plato[];
  titulo: String;
}) => {
  console.log(platos);
  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">
          <Link className="hover:text-primaryOrange" href={"/admin/categoria"}>
            Todas mis categorias
          </Link>
          / Platos de {titulo}
        </h1>
        <Buscador />
      </div>
      <DisplayerPlato platos={platos} />
    </div>
  );
};

export default DetallesCategoria;
