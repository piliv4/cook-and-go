import { eliminarMenu, getMenuById } from "@/api/menu";
import DisplayerPlatos from "@/components/admins/menu/DisplayerPlatos";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import { GetServerSideProps } from "next";
import router from "next/router";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const DetallesMenu = ({ menu }: { menu: Menu }) => {
  const tiposMenu = ["entrantes", "primeros", "segundos", "postres"];

  async function borrarMenu() {
    try {
      await eliminarMenu(menu.id);
    } catch (error) {
      console.log("Error al eliminar el menu");
    }
    router.replace("/admin/menu");
  }

  function montarCadena() {
    if (menu.incluyeBebida && !menu.incluyePan) {
      return "Bebida incluida";
    }
    if (!menu.incluyeBebida && menu.incluyePan) {
      return "Pan incluido";
    }
    if (menu.incluyeBebida && menu.incluyePan) {
      return "Pan y bebida incluidos";
    }
    return "Pan y bebida no incluidos";
  }
  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <div className="text-2xl font-black col-span-3 text-center uppercase relative">
          {menu.nombre} para {menu.comensales} persona(s)
          <div className="absolute top-1/2 right-0 flex flex-row gap-3">
            <BsFillPencilFill
              className="group fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
              onClick={() => router.push("/admin/menu/editar/" + menu.id)}
            />
            <BsTrashFill
              className="fill-primaryOrange hover:fill-secondaryOrange transition duration-150"
              onClick={() => borrarMenu()}
            />
          </div>
        </div>
      </CabeceraPagina>
      {/* SECCIONES DEL MENU */}
      {tiposMenu.map(
        (tipoMenu) =>
          (menu[tipoMenu as keyof Menu] as Plato[]).length > 0 && (
            <DisplayerPlatos
              key={tipoMenu}
              titulo={tipoMenu}
              platos={menu[tipoMenu as keyof Menu] as Plato[]}
            />
          )
      )}
      <p className="w-full text-center py-2">{montarCadena()}</p>
      <div className="flex flex-row font-black text-xl">
        <p className="w-full">Precio</p>
        <p>{(Math.round(menu.precio * 100) / 100).toFixed(2)}€</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let menu = await getMenuById(id as string);

  return {
    props: {
      menu: menu as Menu,
    },
  };
};

export default DetallesMenu;
