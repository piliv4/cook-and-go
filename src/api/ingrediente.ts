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
