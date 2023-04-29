import supabase from "@/server/client";
import { Ingrediente } from "@/types/Ingrediente";

export const crearIngrediente = async (ingrediente: Ingrediente) => {
  try {
    // Realiza la llamada a la API de Supabase para crear una nueva entidad
    const { error } = await supabase.from("Ingrediente").insert([
      {
        nombre: ingrediente.nombre,
        descripcion: ingrediente.descripcion,
        precio_suplemento: ingrediente.precioSuplemento,
      },
    ]);

    if (error) {
      throw new Error("Error al crear el Ingrediente");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarIngrediente = async (ingrediente: Ingrediente) => {
  try {
    const { error } = await supabase
      .from("Ingrediente")
      .update([
        {
          nombre: ingrediente.nombre,
          descripcion: ingrediente.descripcion,
          precio_suplemento: ingrediente.precioSuplemento,
        },
      ])
      .eq("id", ingrediente.id);

    if (error) {
      throw new Error("Error al modificar el Ingrediente");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarIngrediente = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("ArticuloIngrediente")
      .delete()
      .eq("ingrediente_id", id);

    if (error) {
      throw new Error(
        "Error al eliminar las referencias de ingredientes a plato"
      );
    } else {
      const { error: error2 } = await supabase
        .from("Ingrediente")
        .delete()
        .eq("id", id);
      if (error2) {
        throw new Error("Error al eliminar el ingrediente");
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
