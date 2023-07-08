import { useEffect, useState } from "react";
import PlatoComponente from "./Plato";
import Timer from "./Timer";
import { Comanda } from "@/types/Comanda";
import supabase from "@/server/client";
import { getPlatoById } from "@/api/plato";
import { setEstadoArticulo } from "@/api/comanda";

export default function ComandaComponente({
  comanda,
  finalizarComanda,
}: {
  comanda: Comanda;
  finalizarComanda: Function;
}) {
  const [articulos, setArticulos] = useState(comanda.platos);
  const [colorFondo, setColorFondo] = useState("bg-emerald-300");

  const actualizarEstadoPorId = (id: string, nuevoEstado: string) => {
    const nuevoArray = articulos.map((articulo) => {
      if (articulo.id === id) {
        //Actualizamos en la base de datos
        setEstadoArticulo(id, nuevoEstado);
        //Actualizamos el estado
        return {
          ...articulo,
          estado: nuevoEstado,
        };
      }
      return articulo;
    });
    setArticulos(nuevoArray);
  };

  function finalizarPlato(id: string) {
    console.log(comanda);
    actualizarEstadoPorId(id, "preparado");
    if (
      articulos.filter((articulo) => articulo.estado === "preparado").length ==
      articulos.length - 1
    ) {
      finalizarComanda(comanda.id);
    }
  }

  useEffect(() => {
    const channel = supabase
      .channel("realtime_comandasArticulo")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ComandaArticulo",
        },
        async (payload) => {
          //COMO EL REALTIME SE TRIGEREA CADA VEZ QUE SE AÑADE ALGO
          //SIEMPRE LO DEBEREMOS RECIBIR EN COCINA
          if (
            payload.new.comanda_id === comanda.id &&
            !articulos.some((plato) => plato.id === payload.new.id)
          ) {
            let platoAux = await getPlatoById(payload.new.articulo_id);
            setArticulos(
              articulos.concat({
                id: payload.new.id,
                estado: payload.new.estado,
                plato: platoAux,
              })
            );
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [articulos, setArticulos, comanda.id]);

  return (
    <div className="rounded-md shadow-md border-[1px]  overflow-hidden border-gray-400">
      <div
        className={"w-full grid grid-cols-[70%_30%]  " && colorFondo}
        onDoubleClick={() => finalizarComanda(comanda.id)}
      >
        <h1>Mesa {comanda.mesaNombre}</h1>
        <div className="flex">
          <Timer setColorFondo={setColorFondo} />
        </div>
      </div>
      <div className="w-full py-2 px-2 gap-2 flex flex-col ">
        {articulos.map((plato, index) => {
          return (
            <PlatoComponente
              key={index}
              articuloDeComanda={plato}
              actualizarEstadoPorId={actualizarEstadoPorId}
              finalizarPlato={finalizarPlato}
            />
          );
        })}
      </div>
    </div>
  );
}
