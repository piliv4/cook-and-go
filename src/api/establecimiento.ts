import supabase from "@/server/client";
import { Establecimiento } from "@/types/Establecimiento";

export const crearEstablecimiento = async (
  establecimiento: Establecimiento
) => {
  try {
    const { error } = await supabase.from("Establecimiento").insert([
      {
        nombre: establecimiento.nombre,
        descripcion: establecimiento.descripcion,
        cif: establecimiento.cif,
        correo: establecimiento.correo,
        web: establecimiento.web,
        telefono: establecimiento.telefono,
        ciudad: establecimiento.ciudad,
        direccion: establecimiento.direccion,
      },
    ]);
    if (error) {
      throw new Error("Error al crear el establecimiento");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarEstablecimiento = async (
  establecimiento: Establecimiento
) => {
  try {
    const { error } = await supabase
      .from("Establecimiento")
      .update([
        {
          nombre: establecimiento.nombre,
          descripcion: establecimiento.descripcion,
          cif: establecimiento.cif,
          correo: establecimiento.correo,
          web: establecimiento.web,
          telefono: establecimiento.telefono,
          ciudad: establecimiento.ciudad,
          direccion: establecimiento.direccion,
        },
      ])
      .eq("id", establecimiento.id);
    if (error) {
      throw new Error("Error al modificar el establecimiento");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEstablecimientos = async () => {
  try {
    const { data, error } = await supabase
      .from("Establecimiento")
      .select("*")
      .order("nombre");

    if (error) {
      throw new Error("Error al obtener todas los establecimientos");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
