import LocalFormulario from "@/components/admins/local/LocalFormulario";
import supabase from "@/server/client";
import { Establecimiento } from "@/types/Establecimiento";
import router from "next/router";

export default function CrearLocal() {
  async function crearLocal(local: Establecimiento) {
    const { error } = await supabase
      .from("Local")
      .insert([
        {
          nombre: local.nombre,
          descripcion: local.descripcion,
          cif: local.cif,
          correo: local.correo,
          web: local.web,
          telefono: local.telefono,
          ciudad: local.ciudad,
          direccion: local.direccion,
        },
      ])
      .select();
    console.log(error);
    if (!error) {
      router.push("/admin/menu");
    }
  }

  return <LocalFormulario crearEditar={crearLocal} localProp={null} />;
}
