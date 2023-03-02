import Buscador from "@/components/admins/Buscador";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import supabase from "@/server/client";
import { Plato } from "@/types/types";
import { GetServerSideProps } from "next";

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
        <h1 className="text-2xl font-black ">Platos de {titulo} </h1>
        <Buscador />
      </div>
      <DisplayerPlato platos={platos} />
    </div>
  );
};

export default DetallesCategoria;
