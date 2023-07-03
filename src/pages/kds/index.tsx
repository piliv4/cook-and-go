import { añadirComanda, getComandasByEstablecimiento } from "@/api/comanda";
import { getAllEmpleadosByEstablecimiento } from "@/api/empleado";
import { getEstablecimientoIdByUsuarioId } from "@/api/establecimiento";
import ComandaComponente from "@/components/kds/Comanda";
import { UsuarioContext } from "@/context/UsuarioContext";
import { adaptarComanda } from "@/helpers/adaptadores";
import supabase from "@/server/client";
import { Comanda } from "@/types/Comanda";
import { Empleado } from "@/types/Empleado";
import { useContext, useEffect, useState } from "react";

export default function KDS() {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const { usuarioGlobal } = useContext(UsuarioContext);
  const [camarerosIds, setCamarerosIds] = useState<String[]>([]);

  function finalizarComanda({ index }: { index: number }) {
    const aux = [...comandas];
    aux.splice(index, 1);
    setComandas(aux);
  }

  //OBTENGO LOS CAMAREROS
  useEffect(() => {
    const fetchCamareros = async () => {
      let usuarioAux = [] as Empleado[];
      if (
        usuarioGlobal.establecimientoId != "" &&
        usuarioGlobal.establecimientoId != undefined
      )
        usuarioAux = await getAllEmpleadosByEstablecimiento(
          usuarioGlobal.establecimientoId
        );
      const camarerosAux = usuarioAux.filter(
        (usuario) => usuario.rol === "Camarero"
      );
      const camarerosAuxId = camarerosAux.map((camarero) => camarero.id);
      setCamarerosIds(camarerosAuxId);
    };
    fetchCamareros();
  }, [usuarioGlobal.establecimientoId]);

  //OBTENCIÓN DE TODAS LAS COMANDAS (PRIMERA CARGA Y REFRESCOS)
  useEffect(() => {
    const fetchIngredientes = async () => {
      let comandasAux = [] as Comanda[];
      if (
        usuarioGlobal.establecimientoId != "" &&
        usuarioGlobal.establecimientoId != undefined
      )
        comandasAux = await getComandasByEstablecimiento(
          usuarioGlobal.establecimientoId
        );
      setComandas(comandasAux);
    };
    fetchIngredientes();
  }, [usuarioGlobal.establecimientoId]);

  //LISTENER RECUERDA QUE SOLO RECOGE UN VALOR
  useEffect(() => {
    const channel = supabase
      .channel("realtime_comandas")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Comanda",
        },
        (payload) => {
          console.log(payload);
          // if (camarerosIds.includes(payload.new.usuario_id))
          //setComandas(comandas.concat(adaptarComanda(payload.new)));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl min-w-full">
      <div className="bg-blue-600 py-3 grid grid-cols-[80%_20%] mb-4">
        <h1 className="font-bold text-lg px-2 text-white">
          KDS (kitchen dispay system)
        </h1>
        <button onClick={() => añadirComanda()}>AÑADIR COMANDA</button>
      </div>
      <div className="grid grid-cols-5 gap-3 px-3">
        {comandas.map((comanda, index) => (
          <ComandaComponente
            key={index}
            comanda={comanda}
            index={index}
            finalizarComanda={finalizarComanda}
          />
        ))}
      </div>
    </div>
  );
}
