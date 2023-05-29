import supabase from "@/server/client";
import { Mesa, Seccion } from "@/types/Establecimiento";
import { crearMesa } from "./mesa";

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
