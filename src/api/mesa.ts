import supabase from "@/server/client";
import { Mesa } from "@/types/Establecimiento";

export const crearMesa = async (mesa: Mesa, seccionId: string) => {
  try {
    const { error } = await supabase.from("Mesa").insert([
      {
        tipo: mesa.tipo,
        comensales: mesa.comensales,
        seccion_id: seccionId,
      },
    ]);
    if (error) {
      throw new Error("Error al crear la mesa");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarMesasBySeccionId = async (seccionId: string) => {
  try {
    const { error } = await supabase
      .from("Mesa")
      .delete()
      .eq("seccion_id", seccionId);
    if (error) {
      throw new Error("Error al eliminar las mesas");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMesaBySeccionId = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Mesa")
      .select()
      .eq("seccion_id", id);

    if (error) {
      throw new Error("Error al obtener todas las mesas");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
