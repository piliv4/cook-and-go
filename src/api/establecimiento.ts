import supabase from "@/server/client";
import { Establecimiento, Seccion } from "@/types/Establecimiento";
import { crearSeccion, eliminarSeccionesByEstablecimientoId } from "./seccion";

export const crearEstablecimiento = async (
  establecimiento: Establecimiento
) => {
  try {
    const { data, error } = await supabase
      .from("Establecimiento")
      .insert([
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
      .select()
      .single();
    if (error) {
      throw new Error("Error al crear el establecimiento");
    }
    if (establecimiento.secciones.length > 0)
      insertarSecciones(
        establecimiento.secciones,
        (data as Establecimiento).id
      );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarEstablecimiento = async (
  establecimiento: Establecimiento
) => {
  try {
    eliminarSeccionesByEstablecimientoId(establecimiento.id);
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
    if (establecimiento.secciones.length > 0)
      insertarSecciones(establecimiento.secciones, establecimiento.id);
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

const insertarSecciones = async (
  secciones: Seccion[],
  establecimientoId: string
) => {
  secciones.map(async (seccion) => {
    try {
      crearSeccion(seccion, establecimientoId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};
