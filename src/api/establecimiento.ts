import supabase from "@/server/client";
import { Establecimiento, Seccion } from "@/types/Establecimiento";
import {
  crearSeccion,
  eliminarSecciones,
  getSeccionesByEstablecimientoId,
} from "./seccion";
import { getMesaBySeccionId } from "./mesa";
import { toast } from "react-toastify";

export const crearEstablecimiento = async (
  establecimiento: Establecimiento,
  empleadoId: string
) => {
  try {
    const { data, error } = await supabase
      .from("Establecimiento")
      .insert([
        {
          nombre: establecimiento.nombre,
          descripcion: establecimiento.descripcion,
          cif: establecimiento.cif,
          correo: establecimiento.correo,
          web: establecimiento.web,
          telefono: establecimiento.telefono,
          ciudad: establecimiento.ciudad,
          direccion: establecimiento.direccion,
          imagenURL: establecimiento.imagenURL,
        },
      ])
      .select()
      .single();
    if (data) {
      const { error: error2 } = await supabase
        .from("UsuarioEstablecimiento")
        .insert([
          {
            usuario_id: empleadoId,
            establecimiento_id: data.id,
            rol: "Administrador",
          },
        ])
        .select()
        .single();
      if (error2) {
        throw new Error(
          "Error al insertar la relacion entre usuario y establecimiento"
        );
      }
    }

    if (error) {
      throw new Error("Error al crear el establecimiento");
    }

    if (establecimiento.secciones.length > 0)
      insertarSecciones(
        establecimiento.secciones,
        (data as Establecimiento).id
      );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarEstablecimiento = async (
  establecimiento: Establecimiento
) => {
  try {
    await eliminarSecciones(establecimiento.id);
    const { error } = await supabase
      .from("Establecimiento")
      .update([
        {
          nombre: establecimiento.nombre,
          descripcion: establecimiento.descripcion,
          cif: establecimiento.cif,
          correo: establecimiento.correo,
          web: establecimiento.web,
          telefono: establecimiento.telefono,
          ciudad: establecimiento.ciudad,
          direccion: establecimiento.direccion,
          imagenURL: establecimiento.imagenURL,
        },
      ])
      .eq("id", establecimiento.id);
    if (error) {
      throw new Error("Error al modificar el establecimiento");
    }
    if (establecimiento.secciones.length > 0)
      insertarSecciones(establecimiento.secciones, establecimiento.id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarEstablecimiento = async (id: string) => {
  await eliminarSecciones(id);
  try {
    const { error } = await supabase
      .from("Establecimiento")
      .delete()
      .eq("id", id);
    if (error) {
      throw new Error("Error al eliminar el establecimiento");
    }
    toast.success("¡Establecimiento eliminado correctamente!", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEstablecimientos = async () => {
  try {
    const { data, error } = await supabase
      .from("Establecimiento")
      .select("*")
      .order("nombre");

    if (error) {
      throw new Error("Error al obtener todos los establecimientos");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllEstablecimientosByUsuario = async (usuarioId: string) => {
  if (usuarioId && usuarioId != "") {
    try {
      const { data, error } = await supabase
        .from("Establecimiento")
        .select(
          "id, nombre, descripcion, cif, correo, web, telefono, ciudad, direccion, imagenURL ,UsuarioEstablecimiento!inner(usuario_id)"
        )
        .eq("UsuarioEstablecimiento.usuario_id", usuarioId)
        .order("nombre");

      if (error) {
        throw new Error("Error al obtener todas los establecimientos");
      }
      return data as unknown as Establecimiento[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    return [];
  }
};

export const getEstablecimientoIdByUsuarioId = async (usuarioId: string) => {
  if (usuarioId && usuarioId != "") {
    try {
      const { data, error } = await supabase
        .from("UsuarioEstablecimiento")
        .select()
        .eq("usuario_id", usuarioId);

      if (error) {
        throw new Error("Error al obtener todas los establecimientos");
      }
      if (data.length == 1) return data[0].establecimiento_id;
      return "";
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    return "";
  }
};

export const getEstablecimientoById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("Establecimiento")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Error al obtener el establecimiento");
    } else {
      (data as Establecimiento).secciones =
        await getSeccionesByEstablecimientoId(id);
      for (const seccion of (data as Establecimiento).secciones) {
        try {
          seccion.mesas = await getMesaBySeccionId(seccion.id);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const insertarSecciones = async (
  secciones: Seccion[],
  establecimientoId: string
) => {
  secciones.map(async (seccion) => {
    try {
      crearSeccion(seccion, establecimientoId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};
