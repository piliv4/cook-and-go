import {
  añadirComanda,
  getAllArticulosDeComanda,
  getComandasByEstablecimiento,
} from "@/api/comanda";
import { getEstablecimientoIdByUsuarioId } from "@/api/establecimiento";
import ComandaComponente from "@/components/kds/Comanda";
import { UsuarioContext } from "@/context/UsuarioContext";
import { adaptarComanda } from "@/helpers/adaptadores";
import supabase from "@/server/client";
import { Comanda } from "@/types/Comanda";
import { useContext, useEffect, useState } from "react";

export default function KDS() {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const { usuarioGlobal } = useContext(UsuarioContext);

  function finalizarComanda(id: string) {
    const comandasAux = comandas.filter((comanda) => comanda.id !== id);
    setComandas(comandasAux);
  }

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
    if (
      usuarioGlobal.establecimientoId != "" &&
      usuarioGlobal.establecimientoId != undefined
    ) {
      const channel = supabase
        .channel("realtime_comandas")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "Comanda",
          },
          async (payload) => {
            let establecimientoId = await getEstablecimientoIdByUsuarioId(
              payload.new.usuario_id
            );
            if (establecimientoId == usuarioGlobal.establecimientoId) {
              //Adapto la comanda
              let comandaAux = adaptarComanda(payload.new);
              //Obtengo los platos
              comandaAux.platos = await getAllArticulosDeComanda(comandaAux.id);
              //Concateno la nueva comanda solo si el nº de platos es mayor que 0
              //esto significa que tiene articulos que debemos preparar
              if (comandaAux.platos.length > 0)
                setComandas(comandas.concat(comandaAux));
            }
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, comandas, setComandas]);

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
            finalizarComanda={finalizarComanda}
          />
        ))}
      </div>
    </div>
  );
}
