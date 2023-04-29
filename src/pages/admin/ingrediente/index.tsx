import supabase from "../../../server/client";
import { Ingrediente } from "@/types/Ingrediente";
import CrearIngrediente from "@/components/admins/ingrediente/CrearIngrediente";
import Buscador from "@/components/admins/ui/Buscador";
import IngredienteTable from "@/components/admins/ingrediente/IngredienteTable";

export async function getServerSideProps() {
  let { data } = await supabase.from("Ingrediente").select("*").order("nombre");
  return {
    props: {
      ingredientes: data,
    },
  };
}

export default function IngredientesPagina({
  ingredientes,
}: {
  ingredientes: Ingrediente[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">Mis ingredientes</h1>
        <Buscador />
      </div>
      <CrearIngrediente />
      <IngredienteTable ingrediente={ingredientes} />
    </div>
  );
}
