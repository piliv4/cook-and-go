import { crearMenu } from "@/api/menu";
import { getAllPlatos } from "@/api/plato";
import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import router from "next/router";

export async function getStaticProps() {
  let platos = await getAllPlatos();
  return {
    props: {
      platos: platos as Plato[],
    },
  };
}

export default function CrearMenu({ platos }: { platos: Plato[] }) {
  async function crear(menu: Menu) {
    try {
      await crearMenu(menu);
    } catch (error) {
      console.log(error);
    }
    router.push("/admin/menu");
  }

  return <MenuFormulario crearEditar={crear} menuProp={null} platos={platos} />;
}
