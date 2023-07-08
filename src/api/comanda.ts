import supabase from "@/server/client";
import { Comanda } from "@/types/Comanda";
import { Plato } from "@/types/Plato";
import { getMesaById } from "./mesa";
import {
  adaptadorArticuloComanda,
  adaptarComanda,
} from "@/helpers/adaptadores";
import { ArticuloDeComanda } from "@/types/ArticuloDeComanda";

export const getComandasByEstablecimiento = async (
  establecimientoId: string
) => {
  let parsedComandas = [] as Comanda[];
  try {
    //Obtenemos todas las comandas activas de un establecimiento
    const { data: comandas, error } = await supabase
      .from("Comanda")
      .select("* ,Usuario(*, UsuarioEstablecimiento(*))")
      .eq(
        "Usuario.UsuarioEstablecimiento.establecimiento_id",
        establecimientoId
      )
      .eq("esta_en_servicio", true);

    if (error) {
      throw new Error("Error al obtener las comandas");
    } else {
      for (const comanda of comandas) {
        try {
          //Parseamos la comanda
          let comandaAux = adaptarComanda(comanda);
          //Obtenemos el nombre de la mesa
          comandaAux.mesaNombre = (await getMesaById(comanda.mesa_id)).numero;
          //Obtenemos los platos de la comanda
          comandaAux.platos = await getAllArticulosDeComanda(comanda.id);
          //Añadimos la comanda
          parsedComandas.push(comandaAux);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      if (!error) return parsedComandas;
      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllArticulosDeComanda = async (comandaId: string) => {
  let parsedArticulos = [] as ArticuloDeComanda[];
  try {
    const { data, error } = await supabase
      .from("Articulo")
      .select("* ,ComandaArticulo!inner(*)")
      .eq("ComandaArticulo.comanda_id", comandaId)
      .eq("esBebida", false);
    if (error) {
      throw new Error("Error al obtener los articulos de las comandas");
    }
    for (const dato of data) {
      if (
        dato.ComandaArticulo[0].estado == "pedido" ||
        dato.ComandaArticulo[0].estado == "preparacion"
      )
        parsedArticulos.push(adaptadorArticuloComanda(dato));
    }
    return parsedArticulos;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const añadirComanda = async () => {
  const { data, error } = await supabase
    .from("Comanda")
    .insert([
      {
        esta_en_servicio: true,
        usuario_id: "b6782b7c-aa51-4bde-a02f-e05cae3324ba",
        mesa_id: "593a4ebb-fc81-4b5d-afc0-a666934eb02d",
      },
    ])
    .select()
    .single();
  if (data) {
    await añadirPlato("3a7fe25e-bdd2-4484-9219-6100703c0793", data.id);
    await añadirPlato("ddc3fa4c-afcb-4731-aab8-dd9221702d6f", data.id);
    await añadirPlato("8cc0d1a9-e00c-464d-8e31-07f903e7d74a", data.id);
  }
};

export const añadirPlato = async (platoId: String, comandaId: string) => {
  const { error } = await supabase
    .from("ComandaArticulo")
    .insert([
      {
        comanda_id: comandaId,
        articulo_id: platoId,
        estado: "pedido",
      },
    ])
    .select();
};

export const setEstadoArticulo = async (id: String, estado: string) => {
  console.log(id);
  try {
    const { error } = await supabase
      .from("ComandaArticulo")
      .update([
        {
          estado: estado,
        },
      ])
      .eq("id", id);
  } catch (error) {
    console.error(error);
  }
};
