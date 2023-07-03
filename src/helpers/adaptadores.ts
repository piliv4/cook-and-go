import { Plato } from "@/types/Plato";

export const adaptarComanda = (comandaParam: any) => {
  return {
    id: comandaParam.id,
    fechaFin: comandaParam.fecha_hora_fin,
    fechaIni: comandaParam.fecha_hora_ini,
    enServicio: comandaParam.esta_en_servicio,
    mesaNombre: "",
    platos: [] as Plato[],
  };
};
