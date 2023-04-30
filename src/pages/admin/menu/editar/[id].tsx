import { getMenuById, modificarMenu } from "@/services/menu";
import { getAllPlatos } from "@/services/plato";
import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import { GetServerSideProps } from "next";
import router from "next/router";

export default function CrearMenu({
  menu,
  platos,
}: {
  menu: Menu;
  platos: Plato[];
}) {
  async function editar(menu: Menu) {
    try {
      await modificarMenu(menu);
    } catch (error) {
      console.log("error");
    }
    router.push("/admin/menu");
  }

  return (
    <MenuFormulario crearEditar={editar} menuProp={menu} platos={platos} />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let menu = await getMenuById(id as string);
  let platos = await getAllPlatos();
  return {
    props: {
      menu: menu as Menu,
      platos: platos as Plato[],
    },
  };
};
