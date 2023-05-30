import supabase from "@/server/client";
import { Mesa, Seccion } from "@/types/Establecimiento";
import {
  crearMesa,
  eliminarMesasBySeccionId,
  eliminarMesasYSeccion,
} from "./mesa";

export const crearSeccion = async (
  seccion: Seccion,
  establecimientoId: string
) => {
  try {
    const { data, error } = await supabase
      .from("Seccion")
      .insert([
        {
          nombre: seccion.nombre,
          establecimiento_id: establecimientoId,
        },
      ])
      .select()
      .single();
    if (error) {
      throw new Error("Error al crear la seccion");
    }
    if (seccion.mesas?.length > 0)
      insertarMesas(seccion.mesas, (data as Seccion).id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//ELIMINAR SECCIONES -> OJO CON EL ORDEN DE ELIMINAR CAMPOS
export const eliminarSecciones = async (establecimientoId: string) => {
  //Obtenemos las secciones que queremos eliminar
  const seccionesABorrar = await getSeccionesByEstablecimientoId(
    establecimientoId
  );
  //Recorremos el array y vamos eliminando sus mesas
  for (const seccion of seccionesABorrar) {
    await eliminarMesasYSeccion(seccion.id);
  }
};

export const getSeccionesByEstablecimientoId = async (
  establecimientoId: string
) => {
  try {
    const { data, error } = await supabase
      .from("Seccion")
      .select()
      .eq("establecimiento_id", establecimientoId);

    if (error) {
      throw new Error("Error al obtener todas las secciones");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertarMesas = async (mesas: Mesa[], seccionId: string) => {
  mesas.map(async (mesa) => {
    try {
      crearMesa(mesa, seccionId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};
