import { getMenuById, modificarMenu } from "@/api/menu";
import { getAllPlatosByEstablecimiento } from "@/api/plato";
import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import { GetServerSideProps } from "next";
import router from "next/router";
import { useContext, useEffect, useState } from "react";

export default function CrearMenu({ menu }: { menu: Menu }) {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [platos, setPlatos] = useState<Plato[]>([]);

  async function editar(menu: Menu) {
    try {
      await modificarMenu(menu);
    } catch (error) {
      console.log("error");
    }
    router.push("/admin/menu");
  }

  useEffect(() => {
    const fetchPlatos = async () => {
      let platosAux = [];
      if (establecimientoGlobal.id != undefined) {
        platosAux = await getAllPlatosByEstablecimiento(
          establecimientoGlobal.id
        );
      }
      setPlatos(platosAux);
    };
    fetchPlatos();
  }, [establecimientoGlobal]);

  return (
    <UsuarioAutorizado>
      <MenuFormulario crearEditar={editar} menuProp={menu} platos={platos} />
    </UsuarioAutorizado>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let menu = await getMenuById(id as string);
  return {
    props: {
      menu: menu as Menu,
    },
  };
};
