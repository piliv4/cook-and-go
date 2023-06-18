import supabase from "@/server/client";
import { Empleado } from "@/types/Empleado";
import router from "next/router";

export const crearEmpleado = async (empleado: Empleado) => {
  try {
    const { error } = await supabase.from("Usuario").insert([
      {
        nombre: empleado.nombre,
        correo: empleado.correo,
        contraseña: empleado.contraseña,
        dni: empleado.dni,
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

export const modificarEmpleado = async (empleado: Empleado) => {
  try {
    const { error } = await supabase
      .from("Usuario")
      .update([
        {
          nombre: empleado.nombre,
          correo: empleado.correo,
          contraseña: empleado.contraseña,
          dni: empleado.dni,
          imagenURL: empleado.imagenURL,
          rol: empleado.rol,
        },
      ])
      .eq("id", empleado.id);
    if (error) {
      throw new Error("Error al modificar el empleado");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarEmpleado = async (id: string) => {
  try {
    const { error: error } = await supabase
      .from("UsuarioEstablecimiento")
      .delete()
      .eq("usuario_id", id);
    if (error) {
      throw new Error("Error al eliminar las referencias al establecimiento");
    } else {
      const { error: error2 } = await supabase
        .from("Usuario")
        .delete()
        .eq("id", id);
      if (error2) {
        throw new Error("Error al eliminar el empleado");
      } else {
        router.replace(router.asPath);
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
      .from("Usuario")
      .select("*")
      .order("rol");

    if (error) {
      throw new Error("Error al obtener todas los empleados");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEmpleadoById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Usuario")
      .select("*")
      .order("nombre")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Error al obtener todas los empleados");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const correoExiste = async (correo: string): Promise<string> => {
  const { data, error } = await supabase
    .from("Usuario")
    .select("*")
    .eq("correo", correo);

  if (error) {
    console.error("Error al verificar el correo:", error);
    return "Error al verificar el correo electrónico";
  }
  return data && data.length > 0
    ? "" // Correo electrónico válido y existe en la base de datos
    : "Correo electronico no registrado en el sistema";
};

export const contraseñaValida = async (
  correo: string,
  contrasenya: string
): Promise<string> => {
  const { data, error } = await supabase
    .from("Usuario")
    .select("contraseña")
    .eq("correo", correo)
    .single();

  if (error) {
    console.error("Error al verificar la contraseña:", error);
    return "Error al verificar la contraseña";
  }

  if (data) {
    const empleadoContraseña = data;
    //@ts-ignore
    if (empleadoContraseña.contraseña !== contrasenya) {
      return "Contraseña incorrecta";
    }
  }
  return ""; // Contraseña válida
};

export async function iniciarSesion(correo: string, contraseña: string) {
  const { data, error } = await supabase
    .from("Usuario")
    .select()
    .eq("correo", correo)
    .eq("contraseña", contraseña)
    .limit(1);

  if (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }

  if (data && data.length > 0) {
    return data[0] as Empleado;
  }

  return null;
}
