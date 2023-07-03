import { useEffect, useState } from "react";
import PlatoComponente from "./Plato";
import Timer from "./Timer";
import { Comanda } from "@/types/Comanda";
import supabase from "@/server/client";
import { getPlatoById } from "@/api/plato";

export default function ComandaComponente({
  index,
  comanda,
  finalizarComanda,
}: {
  index: number;
  comanda: Comanda;
  finalizarComanda: Function;
}) {
  const [platos, setPlatos] = useState(comanda.platos);
  const [platosActivos, setPlatosActivos] = useState(platos.length);
  const [colorFondo, setColorFondo] = useState("bg-emerald-300");

  function finalizarPlato() {
    if (platosActivos > 1) {
      setPlatosActivos(platosActivos - 1);
    } else if (platosActivos == 1) {
      setPlatosActivos(platosActivos - 1);
      finalizarComanda(index);
    } else {
      console.log("Problema al finalizar platos");
    }
    console.log(
      "Platos activos: " + platosActivos + "de la comanada: " + index
    );
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
          if (payload.new.comanda_id === comanda.id) {
            let platoAux = await getPlatoById(payload.new.articulo_id);
            setPlatos(platos.concat(platoAux));
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <div className="rounded-md shadow-md border-[1px]  overflow-hidden border-gray-400">
      <div
        className={"w-full grid grid-cols-[70%_30%]  " && colorFondo}
        onDoubleClick={() => finalizarComanda(index)}
      >
        <h1>Mesa {comanda.mesaNombre}</h1>
        <div className="flex">
          <Timer setColorFondo={setColorFondo} />
        </div>
      </div>
      <div className="w-full py-2 px-2 gap-2 flex flex-col ">
        {platos.map((plato, index) => {
          return (
            <PlatoComponente
              key={index}
              plato={plato}
              finalizarPlato={finalizarPlato}
            />
          );
        })}
      </div>
    </div>
  );
}
