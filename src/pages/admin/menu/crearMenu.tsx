import { crearMenu } from "@/api/menu";
import { getAllPlatosByEstablecimiento } from "@/api/plato";
import MenuFormulario from "@/components/admins/menu/MenuFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Menu } from "@/types/Menu";
import { Plato } from "@/types/Plato";
import router from "next/router";
import { useContext, useEffect, useState } from "react";

export default function CrearMenu() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [platos, setPlatos] = useState<Plato[]>([]);

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
