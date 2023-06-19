import { crearMenu } from "@/api/menu";
import { getAllPlatos } from "@/api/plato";
import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import router from "next/router";
import { useContext } from "react";

export async function getStaticProps() {
  let platos = await getAllPlatos();
  return {
    props: {
      platos: platos as Plato[],
    },
  };
}

export default function CrearMenu({ platos }: { platos: Plato[] }) {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  async function crear(menu: Menu) {
    try {
      await crearMenu(menu, establecimientoGlobal.id);
    } catch (error) {
      console.log(error);
    }
    router.push("/admin/menu");
  }

  return (
    <UsuarioAutorizado>
      <MenuFormulario crearEditar={crear} menuProp={null} platos={platos} />;
    </UsuarioAutorizado>
  );
}
