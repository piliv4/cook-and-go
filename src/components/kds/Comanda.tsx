import { useEffect, useState } from "react";
import Plato from "./Plato";
import Timer from "./Timer";
import { Comanda } from "@/types/Comanda";

export default function ComandaComponente({
  index,
  comanda,
  finalizarComanda,
}: {
  index: number;
  comanda: Comanda;
  finalizarComanda: Function;
}) {
  const [platos, setPlatos] = useState([0, 1, 2, 3]);
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

  return (
    <div className="rounded-md shadow-md border-[1px]  overflow-hidden border-gray-400">
      <div
        className={"w-full grid grid-cols-[70%_30%]  " && colorFondo}
        onDoubleClick={() => finalizarComanda(index)}
      >
        <h1>{comanda.mesaNombre}</h1>
        <div className="flex">
          <Timer setColorFondo={setColorFondo} />
        </div>
      </div>
      <div className="w-full py-2 px-2 gap-2 flex flex-col ">
        {platos.map((number, index) => {
          return (
            <Plato key={index} index={index} finalizarPlato={finalizarPlato} />
          );
        })}
      </div>
    </div>
  );
}
