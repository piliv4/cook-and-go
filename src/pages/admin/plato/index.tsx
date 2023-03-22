import supabase from "@/server/client";
import { Ingrediente, Plato } from "@/types/types";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import Buscador from "@/components/admins/Buscador";

export async function getServerSideProps() {
  let { data: platos } = await supabase.from("Articulo").select("*");
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
      platos: platos,
    },
  };
}

export default function PlatoPage({ platos }: { platos: Plato[] }) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-[60%_20%_20%] w-full pb-3 border-primaryGreen border-double border-b-4 ">
        <h1 className="text-2xl font-black ">Todos mis platos</h1>
        <select className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"></select>
        <Buscador />
      </div>
      <DisplayerPlato platos={platos} />
    </div>
  );
}
