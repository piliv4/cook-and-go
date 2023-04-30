import { getAllMenus } from "@/api/menu";
import MenuCard from "@/components/admins/menu/MenuCard";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Menu } from "@/types/Menu";

export async function getServerSideProps() {
  let menus = await getAllMenus();
  return {
    props: {
      menus: menus,
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
      <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-1 sm:gap-3 ">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
}
