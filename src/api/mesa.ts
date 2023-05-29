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
      throw new Error("Error al crear la seccion");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarMesaBySeccionId = async (seccionId: string) => {
  try {
    const { error } = await supabase
      .from("Mesa")
      .delete()
      .eq("seccion_id", seccionId);
    if (error) {
      throw new Error("Error al crear la seccion");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
