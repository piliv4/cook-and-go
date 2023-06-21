import { crearEstablecimiento } from "@/api/establecimiento";
import LocalFormulario from "@/components/admins/establecimiento/EstablecimientoFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { UsuarioContext } from "@/context/UsuarioContext";
import { Establecimiento } from "@/types/Establecimiento";
import router from "next/router";
import { useContext } from "react";

export default function CrearEstablecimiento() {
  const { usuarioGlobal } = useContext(UsuarioContext);

  async function crear(establecimiento: Establecimiento) {
    try {
      await crearEstablecimiento(establecimiento, usuarioGlobal.id);
    } catch (error) {
      console.log("Error al crear un establecimiento");
    }
    router.push("/admin/establecimiento");
  }

  return (
    <UsuarioAutorizado>
      <LocalFormulario establecimientoProp={null} crearEditar={crear} />;
    </UsuarioAutorizado>
  );
}
