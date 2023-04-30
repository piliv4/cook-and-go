import supabase from "@/server/client";
import { Plato } from "@/types/Plato";
import { getIngredientesByPlato } from "./ingrediente";
import { Ingrediente } from "@/types/Ingrediente";

export const crearPlato = async (plato: Plato) => {
  try {
    const { data, error } = await supabase
      .from("Articulo")
      .insert([
        {
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria_id: plato.categoria,
          imagenURL: plato.imagenURL,
        },
      ])
      .select();
    if (error) {
      throw new Error("Error al insertar ingrediente");
    }
    insertarIngredientes(plato.ingredientes, (data[0] as Plato).id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarPlato = async (plato: Plato) => {
  eliminarIngredientes(plato.id);
  try {
    const { error } = await supabase
      .from("Articulo")
      .update([
        {
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          categoria_id: plato.categoria,
          imagenURL: plato.imagenURL,
        },
      ])
      .eq("id", plato?.id);
    if (error) {
      throw new Error("Error al insertar ingrediente");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  insertarIngredientes(plato.ingredientes, plato.id);
};

export const eliminarPlato = async (id: string) => {
  eliminarIngredientes(id);
  try {
    const { error } = await supabase.from("Articulo").delete().eq("id", id);
    if (error) {
      throw new Error("Error al eliminar el plato");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPlatos = async () => {
  try {
    const { data, error } = await supabase
      .from("Articulo")
      .select("*")
      .order("nombre");

    if (error) {
      throw new Error("Error al obtener todas lps platos");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

export const getPlatoById = async (id: string) => {
  try {
    const { data: plato, error } = await supabase
      .from("Articulo")
      .select("*")
      .eq("id", id)
      .single();

    plato.ingredientes = await getIngredientesByPlato(plato.id);

    if (error) {
      throw new Error("Error al los platos a partir del id");
    }
    return plato;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertarIngredientes = async (
  ingredientes: Ingrediente[],
  platoId: string
) => {
  ingredientes.map(async (ingrediente) => {
    try {
      const { error: error } = await supabase
        .from("ArticuloIngrediente")
        .insert([
          {
            ingrediente_id: ingrediente.id,
            articulo_id: platoId,
          },
        ]);
      if (error) {
        throw new Error("Error al insertar ingrediente");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};

const eliminarIngredientes = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("ArticuloIngrediente")
      .delete()
      .eq("articulo_id", id);
    if (error) {
      throw new Error("Error al insertar ingrediente");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
