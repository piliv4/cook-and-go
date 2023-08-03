import supabase from "@/server/client";
import { Ingrediente } from "@/types/Ingrediente";
import router from "next/router";
import { toast } from "react-toastify";

export const crearIngrediente = async (
  ingrediente: Ingrediente,
  establecimientoId: string
) => {
  try {
    // Realiza la llamada a la API de Supabase para crear una nueva entidad
    const { error } = await supabase.from("Ingrediente").insert([
      {
        nombre: ingrediente.nombre,
        descripcion: ingrediente.descripcion,
        precio_suplemento: ingrediente.precioSuplemento,
        stock: ingrediente.stock,
        unidad: ingrediente.unidad,
        establecimiento_id: establecimientoId,
      },
    ]);

    if (error) {
      throw new Error("Error al crear el Ingrediente");
    } else {
      router.push(router.asPath);
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
          stock: ingrediente.stock,
          unidad: ingrediente.unidad,
        },
      ])
      .eq("id", ingrediente.id);

    if (error) {
      throw new Error("Error al modificar el Ingrediente");
    } else {
      router.push(router.asPath);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarStock = async (ingredientes: Ingrediente[]) => {
  ingredientes.map(async (ingrediente) => {
    try {
      const { error } = await supabase
        .from("Ingrediente")
        .update([
          {
            stock: ingrediente.stock,
          },
        ])
        .eq("id", ingrediente.id);

      if (error) {
        throw new Error("Error al modificar el stock el Ingrediente");
      } else {
        router.push(router.asPath);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
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
      } else {
        router.push(router.asPath);

        toast.success("¡Ingrediente eliminado correctamente!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllIngredientes = async () => {
  try {
    const { data, error } = await supabase
      .from("Ingrediente")
      .select("*")
      .order("nombre");

    if (error) {
      throw new Error("Error al obtener todos los ingredientes");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllIngredientesByEstablecimiento = async (
  establecimientoId: string
) => {
  if (establecimientoId) {
    try {
      const { data, error } = await supabase
        .from("Ingrediente")
        .select("*")
        .eq("establecimiento_id", establecimientoId)
        .order("nombre");

      if (error) {
        throw new Error("Error al obtener todos los ingredientes");
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

export const getIngredientesFaltantes = async (establecimientoId: string) => {
  if (establecimientoId) {
    try {
      const { data, error } = await supabase
        .from("Ingrediente")
        .select("*")
        .eq("establecimiento_id", establecimientoId)
        .lte("stock", 0)
        .order("nombre");

      if (error) {
        throw new Error("Error al obtener los ingredientes faltantes");
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

export const getIngredientesPaginados = async (
  ini: number,
  fin: number,
  establecimientoId: string
) => {
  if (establecimientoId) {
    try {
      const { data, error } = await supabase
        .from("Ingrediente")
        .select("*")
        .eq("establecimiento_id", establecimientoId)
        .order("nombre")
        .range(ini, fin);

      if (error) {
        throw new Error("Error al obtener todos los ingredientes");
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

export const getIngredientesByPlato = async (id: string) => {
  try {
    const ingredientes = [];
    const { data: ingredientesId, error } = await supabase
      .from("ArticuloIngrediente")
      .select("ingrediente_id")
      .eq("articulo_id", id);

    if (ingredientesId != null) {
      for (const id of ingredientesId) {
        let { data: ingrediente } = await supabase
          .from("Ingrediente")
          .select("*")
          .eq("id", id.ingrediente_id);
        ingrediente && ingredientes.push(ingrediente[0] as Ingrediente);
      }
    }
    if (error) {
      throw new Error("Error al obtener los ingredientes por plato");
    }
    return ingredientes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIngredientesExtra = async (articuloComandaId: string) => {
  try {
    const { data, error } = await supabase
      .from("Ingrediente")
      .select("* ,ComandaArticuloIngrediente!inner(*)")
      .eq("ComandaArticuloIngrediente.comanda_articulo_id", articuloComandaId);
    if (!error) return data;
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cambiarStockIngrediente = async (
  ingredienteId: string,
  stock: number
) => {
  try {
    const { data, error } = await supabase
      .from("Ingrediente")
      .update([{ stock: stock }])
      .eq("id", ingredienteId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
