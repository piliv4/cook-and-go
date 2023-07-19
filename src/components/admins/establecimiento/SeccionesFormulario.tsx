import { Establecimiento, Mesa, Seccion } from "@/types/Establecimiento";
import SeccionCard from "./SeccionCard";
import { useState } from "react";

const SeccionesFormulario = ({
  establecimiento,
  setEstablecimiento,
}: {
  establecimiento: Establecimiento;
  setEstablecimiento: Function;
}) => {
  function anyadirSeccion() {
    let establecimientoCopia = { ...establecimiento };
    establecimientoCopia.secciones == undefined
      ? //Si las secciones no estan definidas entonces declaramos el array
        (establecimientoCopia.secciones = [{} as Seccion])
      : //Si estan definidas entonces pusheamos la nueva sección
        establecimientoCopia.secciones.push({} as Seccion);
    setEstablecimiento(establecimientoCopia);
  }

  return (
    <div>
      <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
        ESTABLECER SECCIONES
      </h1>
      <div className=" overflow-y-auto overflow-hidden  max-h-[332px] my-1 flex justify-center">
        <div className=" max-w-[520px] w-full">
          {establecimiento.secciones?.map((seccion, index) => (
            <SeccionCard
              key={index}
              index={index}
              establecimiento={establecimiento}
              setEstablecimiento={setEstablecimiento}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => anyadirSeccion()}
        className="mt-2 sm:mx-3 w-full text-center font-black bg-primaryOrange text-lg text-white uppercase rounded-full py-2"
      >
        Añadir sección
      </button>
    </div>
  );
};
export default SeccionesFormulario;
