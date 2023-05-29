import supabase from "@/server/client";
import { Mesa, Seccion } from "@/types/Establecimiento";
import { crearMesa, eliminarMesasBySeccionId } from "./mesa";

export const crearSeccion = async (seccion: Seccion, restauranteID: string) => {
  try {
    const { data, error } = await supabase
      .from("Seccion")
      .insert([
        {
          nombre: seccion.nombre,
          restaurante_id: restauranteID,
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
    try {
      eliminarMesasBySeccionId(seccion.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //Una vez eliminado eliminamos todas las secciones
  try {
    const { error } = await supabase
      .from("Seccion")
      .delete()
      .eq("establecimiento_id", establecimientoId);
    if (error) {
      throw new Error("Error al crear la seccion");
    }
  } catch (error) {
    console.error(error);
    throw error;
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
