import { useState } from "react";
import Extra from "./Extra";
import { ArticuloDeComanda } from "@/types/ArticuloDeComanda";
import { setEstadoArticulo } from "@/api/comanda";

export default function PlatoComponente({
  articuloDeComanda,
  finalizarPlato,
}: {
  articuloDeComanda: ArticuloDeComanda;
  comandaId: string;
  finalizarPlato: Function;
}) {
  const [enPreparacion, setEnPreparacion] = useState(
    articuloDeComanda.estado == "preparacion"
  );
  const [ordenTerminada, setOrdenTerminada] = useState(
    articuloDeComanda.estado == "preparado"
  );

  console.log(articuloDeComanda);
  function preparar() {
    setEnPreparacion(true);
    setEstadoArticulo(articuloDeComanda.id, "preparacion");
  }

  function finalizar() {
    setOrdenTerminada(true);
    setEstadoArticulo(articuloDeComanda.id, "preparado");
    finalizarPlato();
  }

  function flujoComanda() {
    !enPreparacion ? preparar() : finalizar();
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
          {articuloDeComanda.plato.nombre}
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
