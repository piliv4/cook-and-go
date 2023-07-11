import { useState } from "react";
import Extra from "./Extra";
import { ArticuloDeComanda } from "@/types/ArticuloDeComanda";
import ConsultarIngredientes from "./ConsultarIngredientes";
import IngredientesExtra from "./IngredientesExtra";
import { BsExclamationTriangleFill, BsEye, BsEyeSlash } from "react-icons/bs";

export default function PlatoComponente({
  articuloDeComanda,
  actualizarEstadoPorId,
  finalizarPlato,
}: {
  articuloDeComanda: ArticuloDeComanda;
  actualizarEstadoPorId: Function;
  finalizarPlato: Function;
}) {
  const [enPreparacion, setEnPreparacion] = useState(
    articuloDeComanda.estado == "preparacion"
  );
  const [errorPlato, setErrorPlato] = useState(true);
  const [ordenTerminada, setOrdenTerminada] = useState(
    articuloDeComanda.estado == "preparado"
  );

  const [verIngredientes, setVerIngredientes] = useState(false);

  function preparar() {
    setEnPreparacion(true);
    actualizarEstadoPorId(articuloDeComanda.id, "preparacion");
  }

  function finalizar() {
    setOrdenTerminada(true);
    finalizarPlato(articuloDeComanda.id);
  }

  function puedoPrepararPlato(valor: boolean) {
    setErrorPlato(errorPlato && valor);
  }

  function flujoComanda() {
    !enPreparacion ? preparar() : finalizar();
  }
  return (
    <div className="bg-white w-full  border-[1px] border-slate-600 rounded-md overflow-hidden">
      <div
        className={
          ordenTerminada
            ? "font-medium p-1 font line-through"
            : "font-medium p-1 border-b-[1px] border-slate-400 flex gap-1 items-center "
        }
      >
        <p className="w-full font-bold ">{articuloDeComanda.plato.nombre}</p>
        {!errorPlato && <BsExclamationTriangleFill />}
        {!ordenTerminada &&
          (verIngredientes ? (
            <BsEyeSlash onClick={() => setVerIngredientes(!verIngredientes)} />
          ) : (
            <BsEye onClick={() => setVerIngredientes(!verIngredientes)} />
          ))}
      </div>
      {!ordenTerminada && (
        <div>
          <ConsultarIngredientes
            platoId={articuloDeComanda.plato.id}
            verIngredientes={verIngredientes}
            setErrorPlato={puedoPrepararPlato}
          />

          <IngredientesExtra articuloComandaId={articuloDeComanda.id} />
        </div>
      )}
      {!ordenTerminada && (
        <button
          className={
            !enPreparacion
              ? "bg-secondaryGreen w-full font-medium text-white"
              : "bg-primaryGreen w-full font-medium text-white"
          }
          onClick={() => flujoComanda()}
        >
          {!enPreparacion ? "Preparar" : "Finalizar"}
        </button>
      )}
    </div>
  );
}
