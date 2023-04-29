import supabase from "@/server/client";
import { getPlatoById } from "./plato";

export const eliminarMenu = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("MenuArticulo")
      .delete()
      .eq("menu_id", id);

    if (error) {
      throw new Error("Error al eliminar las referencias de menu a plato");
    } else {
      const { error: error2 } = await supabase
        .from("Menu")
        .delete()
        .eq("id", id);
      if (error2) {
        throw new Error("Error al eliminar el menu");
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMenuById = async (id: string) => {
  try {
    const { data: menu, error } = await supabase
      .from("Menu")
      .select("*")
      .eq("id", id)
      .single();

    //RECUPERAMOS LOS PLATOS
    menu.entrantes = [];
    menu.primeros = [];
    menu.segundos = [];
    menu.postres = [];
    menu.incluyePan = menu.incluye_pan;
    menu.incluyeBebida = menu.incluye_bebida;

    let { data: platosId } = await supabase
      .from("MenuArticulo")
      .select()
      .eq("menu_id", menu.id);

    if (platosId != null) {
      for (const platoId of platosId) {
        let plato = await getPlatoById(platoId.articulo_id);
        if (plato) {
          switch (platoId.tipo) {
            case "entrantes":
              menu.entrantes.push(plato);
              break;

            case "primeros":
              menu.primeros.push(plato);
              break;

            case "segundos":
              menu.segundos.push(plato);
              break;

            case "postres":
              menu.postres.push(plato);
              break;
          }
        }
      }
    }

    if (error) {
      throw new Error("Error al obtener todas las categorias");
    }
    return menu;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
