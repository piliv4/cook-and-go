import supabase from "@/server/client";
import { Comanda } from "@/types/Comanda";
import { Plato } from "@/types/Plato";
import { getMesaById } from "./mesa";

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
          let comandaAux = {
            id: comanda.id,
            fechaFin: comanda.fecha_hora_fin,
            fechaIni: comanda.fecha_hora_ini,
            enServicio: comanda.esta_en_servicio,
            mesaNombre: "",
            platos: [] as Plato[],
          };
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
        if (!error) return parsedComandas;
      }
      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllArticulosDeComanda = async (comandaId: string) => {
  try {
    //Obtenemos todas las comandas activa de un establecimiento
    const { data, error } = await supabase
      .from("Articulo")
      .select("* ,ComandaArticulo!inner(*)")
      .eq("ComandaArticulo.comanda_id", comandaId)
      .eq("esBebida", false);
    if (error) {
      throw new Error("Error al obtener los articulos de las comandas");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
