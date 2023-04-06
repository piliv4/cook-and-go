import MenuCard from "@/components/admins/menu/MenuCard";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import SubirImagen from "@/components/admins/ui/SubirImagen";
import supabase from "@/server/client";
import { Menu } from "@/types/types";
import Link from "next/link";

export async function getServerSideProps() {
  let { data } = await supabase.from("Menu").select("*").order("nombre");
  return {
    props: {
      menus: data,
    },
  };
}

export default function menu({ menus }: { menus: Menu[] }) {
  return (
    <div className=" ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-2 ">Todos mis menús</h1>
        <Buscador />
      </CabeceraPagina>
      <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
}
