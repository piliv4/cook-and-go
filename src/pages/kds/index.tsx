import Comanda from "@/components/kds/Comanda";
import { useState } from "react";

export default function KDS() {
  const [comandas, setComandas] = useState([
    "Comanda 1",
    "Comanda 2",
    "Comanda 3",
    "Comanda 4",
    "Comanda 5",
  ]);

  function finalizarComanda({ index }: { index: number }) {
    const aux = [...comandas];
    aux.splice(index, 1);
    setComandas(aux);
  }

  return (
    <div className="max-w-xl min-w-full">
      <div className="bg-blue-600 py-3 grid grid-cols-[80%_20%] mb-4">
        <h1 className="font-bold text-lg px-2 text-white">
          KDS (kitchen dispay system)
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-3 px-3">
        {comandas.map((comanda, index) => (
          <Comanda
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
