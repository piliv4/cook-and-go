import Buscador from "@/components/admins/Buscador";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import supabase from "@/server/client";
import { Plato } from "@/types/types";
import { GetServerSideProps } from "next";

//NO FUNCIONA >:[

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;

//   let { data: plato } = await supabase
//     .from("Articulo")
//     .select("*")
//     .eq("categoria_id", id);

//   return {
//     props: {
//       plato: plato as Plato[],
//     },
//   };
// };

const DetallesCategoria = ({
  platos,
  titulo,
}: {
  platos: Plato[];
  titulo: String;
}) => {
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
