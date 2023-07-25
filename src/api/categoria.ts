import supabase from "@/server/client";
import { Categoria } from "@/types/Categoria";
import router from "next/router";
import { eliminarPlatosByCategoriaId } from "./plato";
import { toast } from "react-toastify";

export const crearCategoria = async (
  categoria: Categoria,
  establecimientoId: string
) => {
  try {
    const { error } = await supabase.from("Categoria").insert([
      {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        imagenURL: categoria.imagenURL,
        esDeBebidas: categoria.esDeBebidas,
        establecimiento_id: establecimientoId,
      },
    ]);

    if (error) {
      throw new Error("Error al crear la categoria");
    } else {
      router.replace(router.asPath);
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
    } else {
      router.replace(router.asPath);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarCategoria = async (id: string) => {
  await eliminarPlatosByCategoriaId(id);
  try {
    const { error: error2 } = await supabase
      .from("Categoria")
      .delete()
      .eq("id", id);
    if (error2) {
      throw new Error("Error al eliminar la categoria");
    }
    toast.success("¡Categoría eliminada correctamente!", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllCategorias = async () => {
  try {
    const { data, error } = await supabase
      .from("Categoria")
      .select("*")
      .order("nombre");

    if (error) {
      throw new Error("Error al obtener todas las categorias");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllCategoriasByEstablecimiento = async (
  establecimientoId: string
) => {
  if (establecimientoId) {
    try {
      const { data, error } = await supabase
        .from("Categoria")
        .select("*")
        .order("nombre")
        .eq("establecimiento_id", establecimientoId);

      if (error) {
        throw new Error(
          "Error al obtener las categorias en función del establecimiento"
        );
      }
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    return [];
  }
};

export const getAllCategoriasBebidas = async (establecimientoId: string) => {
  try {
    const { data, error } = await supabase
      .from("Categoria")
      .select("*")
      .order("nombre")
      .eq("establecimiento_id", establecimientoId)
      .eq("esDeBebidas", true);

    if (error) {
      throw new Error("Error al obtener todas las categorias");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllCategoriasPlatos = async (establecimientoId: string) => {
  try {
    const { data, error } = await supabase
      .from("Categoria")
      .select("*")
      .order("nombre")
      .eq("establecimiento_id", establecimientoId)
      .eq("esDeBebidas", false);

    if (error) {
      throw new Error("Error al obtener todas las categorias por bebida");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategoriaById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Categoria")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Error al obtener la categoria por id");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategoriaTitulo = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Categoria")
      .select("nombre")
      .eq("id", id);

    if (error) {
      throw new Error("Error al obtener el titulo de la categoria");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
