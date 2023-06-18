import supabase from "@/server/client";
import { Bebida } from "@/types/Bebida";
import router from "next/router";

export const crearBebida = async (bebida: Bebida) => {
  try {
    const { error } = await supabase.from("Articulo").insert([
      {
        nombre: bebida.nombre,
        descripcion: bebida.descripcion,
        precio: bebida.precio,
        categoria_id: bebida.categoria,
        imagenURL: bebida.imagenURL,
        esBebida: true,
      },
    ]);

    if (error) {
      throw new Error("Error al insertar la bebida");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  router.back();
};

export const editarBebida = async (bebida: Bebida) => {
  try {
    const { error } = await supabase
      .from("Articulo")
      .update([
        {
          nombre: bebida.nombre,
          descripcion: bebida.descripcion,
          precio: bebida.precio,
          categoria_id: bebida.categoria,
          imagenURL: bebida.imagenURL,
        },
      ])
      .eq("id", bebida?.id);
    if (error) {
      throw new Error("Error al modificar la bebida");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  router.back();
};

export const eliminarBebida = async (id: string) => {
  try {
    const { error } = await supabase.from("Articulo").delete().eq("id", id);
    if (error) {
      throw new Error("Error al eliminar la bebida");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  router.push("/admin/bebida");
  router.replace(router.asPath);
};

export const getAllBebidas = async () => {
  try {
    const { data, error } = await supabase
      .from("Articulo")
      .select("*")
      .order("nombre")
      .eq("esBebida", true);

    if (error) {
      throw new Error("Error al obtener todas las bebidas");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBebidaByCategoria = async (id: string) => {
  try {
    const { data: bebidas, error } = await supabase
      .from("Articulo")
      .select("*")
      .eq("categoria_id", id);

    if (error) {
      throw new Error("Error al obtener las bebidas a partir de la categoria");
    }
    return bebidas;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBebidaById = async (id: string) => {
  try {
    const { data: bebida, error } = await supabase
      .from("Articulo")
      .select("*")
      .eq("id", id)
      .single();
    if (bebida) bebida.categoria = bebida.categoria_id;

    if (error) {
      throw new Error("Error al los bebidas a partir del id");
    }
    return bebida;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarBebidasByCategoriaId = async (id: string) => {
  try {
    const { error } = await supabase
      .from("Articulo")
      .delete()
      .eq("categoria_id", id);
    if (error) {
      throw new Error("Error al eliminar las bebidas por categoria");
    } else {
      router.replace(router.asPath);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
