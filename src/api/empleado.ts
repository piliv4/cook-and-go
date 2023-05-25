import supabase from "@/server/client";
import { Empleado } from "@/types/Empleado";

export const crearEmpleado = async (empleado: Empleado) => {
  try {
    const { error } = await supabase.from("Empleado").insert([
      {
        nombre: empleado.nombre,
        correo: empleado.correo,
        contraseña: empleado.contraseña,
        DNI: empleado.dni,
        imagenURL: empleado.imagenURL,
        rol: empleado.rol,
      },
    ]);
    if (error) {
      throw new Error("Error al crear el empleado");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarEmpleado = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("EmpleadoEstablecimiento")
      .delete()
      .eq("empleado_id", id);
    if (error) {
      throw new Error("Error al eliminar las referencias al establecimiento");
    } else {
      const { error: error2 } = await supabase
        .from("Empleado")
        .delete()
        .eq("id", id);
      if (error2) {
        throw new Error("Error al eliminar el empleado");
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEmpleados = async () => {
  try {
    const { data, error } = await supabase
      .from("Empleado")
      .select("*")
      .order("nombre");

    if (error) {
      throw new Error("Error al obtener todas los empleados");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
