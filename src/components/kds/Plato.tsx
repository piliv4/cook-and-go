import { useState } from "react";
import Extra from "./Extra";

export default function Plato({
  index,
  finalizarPlato,
}: {
  index: number;
  finalizarPlato: Function;
}) {
  const [enPreparacion, setEnPreparacion] = useState(false);
  const [ordenTerminada, setOrdenTerminada] = useState(false);
  function flujoComanda() {
    !enPreparacion
      ? setEnPreparacion(true)
      : (setOrdenTerminada(true), finalizarPlato());
  }
  return (
    <div className="bg-white w-full  border-[1px] border-slate-400 rounded-md overflow-hidden">
      <div className="p-1">
        <p
          className={
            ordenTerminada
              ? "font-medium p-1 font line-through"
              : "font-medium p-1"
          }
        >
          1 PATATAS A LO POBRE
        </p>
        {!ordenTerminada && (
          <div className="pl-4">
            <Extra />
            <Extra />
            <Extra />
          </div>
        )}
      </div>
      {!ordenTerminada && (
        <button
          className={
            !enPreparacion
              ? "bg-green-400 w-full font-medium text-white"
              : "bg-rose-600 w-full font-medium text-white"
          }
          onClick={() => flujoComanda()}
        >
          {!enPreparacion ? "Preparar" : "Finalizar"}
        </button>
      )}
    </div>
  );
}
