import supabase from "@/server/client";
import { Plato } from "@/types/Plato";
import { getIngredientesByPlato } from "./ingrediente";

export const getPlatosByCategoria = async (id: string) => {
  try {
    const { data: platos, error } = await supabase
      .from("Articulo")
      .select("*")
      .eq("categoria_id", id);
    for (let plato of platos as Plato[]) {
      plato.ingredientes = await getIngredientesByPlato(plato.id);
    }

    if (error) {
      throw new Error("Error al los platos a partir de la categoria");
    }
    return platos;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
