import supabase from "@/server/client";
import { Categoria } from "@/types/Categoria";

export const crearCategoria = async (categoria: Categoria) => {
  try {
    const { error } = await supabase.from("Categoria").insert([
      {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        imagenURL: categoria.imagenURL,
      },
    ]);

    if (error) {
      throw new Error("Error al crear la categoria");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarCategoria = async (categoria: Categoria) => {
  try {
    const { error } = await supabase
      .from("Categoria")
      .update([
        {
          nombre: categoria.nombre,
          descripcion: categoria.descripcion,
          imagenURL: categoria.imagenURL,
        },
      ])
      .eq("id", categoria.id);

    if (error) {
      throw new Error("Error al editar categoria");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarCategoria = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("Articulo")
      .delete()
      .eq("categoria_id", id);
    if (error) {
      throw new Error("Error al eliminar las referencias los platos");
    } else {
      const { error: error2 } = await supabase
        .from("Categoria")
        .delete()
        .eq("id", id);
      if (error2) {
        throw new Error("Error al eliminar la categoria");
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
