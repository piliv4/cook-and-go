import { ArticuloDeComanda } from "@/types/ArticuloDeComanda";
import { Plato } from "@/types/Plato";

export const adaptarComanda = (comandaParam: any) => {
  return {
    id: comandaParam.id,
    fechaFin: comandaParam.fecha_hora_fin,
    fechaIni: comandaParam.fecha_hora_ini,
    enServicio: comandaParam.esta_en_servicio,
    mesaNombre: "",
    platos: [] as ArticuloDeComanda[],
  };
};

export const adaptadorArticuloComanda = (articuloComandaParam: any) => {
  console.log(articuloComandaParam);
  return {
    id: articuloComandaParam.ComandaArticulo[0].id,
    estado: articuloComandaParam.ComandaArticulo[0].estado,
    plato: articuloComandaParam as Plato,
  };
};
