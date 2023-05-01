import { crearEstablecimiento } from "@/api/establecimiento";
import LocalFormulario from "@/components/admins/establecimiento/EstablecimientoFormulario";
import supabase from "@/server/client";
import { Establecimiento } from "@/types/Establecimiento";
import router from "next/router";

export default function CrearEstablecimiento() {
  async function crear(establecimiento: Establecimiento) {
    try {
      await crearEstablecimiento(establecimiento);
    } catch (error) {
      console.log("Error al crear un establecimiento");
    }
    router.push("/admin/menu");
  }

  return <LocalFormulario crearEditar={crear} localProp={null} />;
}