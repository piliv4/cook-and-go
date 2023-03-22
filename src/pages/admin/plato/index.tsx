import supabase from "@/server/client";
import { Plato } from "@/types/types";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import Buscador from "@/components/admins/Buscador";

export async function getServerSideProps() {
  let { data } = await supabase.from("Articulo").select("*");
  return {
    props: {
      platos: data,
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
