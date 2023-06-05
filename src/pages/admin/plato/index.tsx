import supabase from "@/server/client";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import { getAllPlatos } from "@/api/articulo";

export async function getServerSideProps() {
  let platos = await getAllPlatos();
  return {
    props: {
      platos: platos,
    },
  };
}

export default function PlatoPage({ platos }: { platos: Plato[] }) {
  return (
    <div className="flex flex-col gap-4">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">Todos mis platos</h1>
        <select className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"></select>
        <Buscador />
      </CabeceraPagina>
      <DisplayerPlato platos={platos} />
    </div>
  );
}
