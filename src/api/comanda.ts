import Plato from "@/components/kds/Plato";
import supabase from "@/server/client";

export const getComandasByEstablecimiento = async (
  establecimientoId: string
) => {
  try {
    //Obtenemos todas las comandas activa de un establecimiento
    const { data, error } = await supabase
      .from("Comanda")
      .select("* ,Usuario(*, UsuarioEstablecimiento(*))")
      .eq("Usuario.UsuarioEstablecimiento.id", establecimientoId)
      .eq("esta_en_servicio", true);

    if (error) {
      throw new Error("Error al obtener las comandas");
    }
    //else {
    //   for (const id of data.id) {
    //     try {
    //       seccion.mesas = await getMesaBySeccionId(seccion.id);
    //     } catch (error) {
    //       console.error(error);
    //       throw error;
    //     }
    //   }
    // }
    console.log(data);
    return data;
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
      .select("* ,ComandaArticulo(*)")
      .eq("ComandaArticulo.comanada_id", comandaId);

    if (error) {
      throw new Error("Error al obtener los platos de las comandas");
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
