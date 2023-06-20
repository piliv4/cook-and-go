import supabase from "@/server/client";
import { Empleado } from "@/types/Empleado";
import router from "next/router";

export const crearEmpleado = async (
  empleado: Empleado,
  establecimientoId: string
) => {
  try {
    const { data, error } = await supabase
      .from("Usuario")
      .insert([
        {
          nombre: empleado.nombre,
          correo: empleado.correo,
          contraseña: empleado.contraseña,
          dni: empleado.dni,
          imagenURL: empleado.imagenURL,
        },
      ])
      .select()
      .single();
    //Insertamos la relación

    if (error) {
      throw new Error("Error al crear el empleado");
    } else {
      if (data)
        await insertarRelacion(
          (data as Empleado).id,
          establecimientoId,
          empleado.rol
        );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const insertarRelacion = async (
  empleadoId: string,
  establecimientoId: string,
  rol: string
) => {
  try {
    const { error } = await supabase.from("UsuarioEstablecimiento").insert([
      {
        usuario_id: empleadoId,
        establecimiento_id: establecimientoId,
        rol: rol,
      },
    ]);
    if (error) {
      throw new Error(
        "Error al establecer la relacion entre empleado y usuario"
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const modificarEmpleado = async (empleado: Empleado) => {
  //Primero modificamos el rol
  await modificarRol(empleado);
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

export const modificarRol = async (empleado: Empleado) => {
  try {
    const { error } = await supabase
      .from("UsuarioEmpleado")
      .update([
        {
          rol: empleado.rol,
        },
      ])
      .eq("usuario_id", empleado.id);
    if (error) {
      throw new Error("Error al modificar el rol");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarEmpleado = async (id: string) => {
  try {
    const { error: error2 } = await supabase
      .from("Usuario")
      .delete()
      .eq("id", id);
    if (error2) {
      throw new Error("Error al eliminar el empleado");
    } else {
      router.replace(router.asPath);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEmpleadosByEstablecimiento = async (
  establecimientoId: string
) => {
  try {
    const { data, error } = await supabase
      .from("Usuario")
      .select(
        `id, nombre, correo, contraseña, dni, imagenURL, UsuarioEstablecimiento!inner(establecimiento_id, rol)`
      )
      .eq("UsuarioEstablecimiento.establecimiento_id", establecimientoId)
      .neq("UsuarioEstablecimiento.rol", "Administrador");

    if (error) {
      throw new Error("Error al obtener todas los empleados");
    }
    // Transformación de los datos a objetos de tipo Empleado
    const empleados: Empleado[] = data.map((usuario: any) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      dni: usuario.dni,
      imagenURL: usuario.imagenURL,
      rol: usuario.UsuarioEstablecimiento[0].rol,
    }));

    return empleados;
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
