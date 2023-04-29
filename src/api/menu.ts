import supabase from "@/server/client";

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
