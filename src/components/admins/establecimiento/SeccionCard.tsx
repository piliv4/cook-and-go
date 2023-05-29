import { useState } from "react";
import MesaCard from "./MesaCard";
import { Establecimiento, Mesa, Seccion } from "@/types/Establecimiento";
import MesaFormulario from "./MesaFormulario";
import { BsTrashFill } from "react-icons/bs";

const SeccionCard = ({
  index,
  establecimiento,
  setEstablecimiento,
}: {
  index: number;
  establecimiento: Establecimiento;
  setEstablecimiento: Function;
}) => {
  const seccion = establecimiento.secciones[index];
  function anyadirMesa(mesa: Mesa) {
    let establecimientoCopia = { ...establecimiento };
    establecimientoCopia.secciones[index].mesas == undefined
      ? //Si las mesas no estan definidas entonces declaramos el array
        (establecimientoCopia.secciones[index].mesas = [mesa])
      : //Si estan definidas entonces pusheamos la nueva mesa
        establecimientoCopia.secciones[index].mesas.push(mesa);
    setEstablecimiento(establecimientoCopia);
  }

  function cambiarNombre(nombre: string) {
    let establecimientoCopia = { ...establecimiento };
    establecimientoCopia.secciones[index].nombre = nombre;
    setEstablecimiento(establecimientoCopia);
  }

  function eliminarSeccion() {
    let establecimientoCopia = { ...establecimiento };
    establecimientoCopia.secciones.splice(index, 1);
    setEstablecimiento(establecimientoCopia);
  }

  return (
    <div>
      <div className="flex flex-row mt-2">
        <input
          placeholder="Introduzca el nombre de la sección..."
          defaultValue={establecimiento.secciones[index].nombre}
          value={establecimiento.secciones[index].nombre}
          onChange={(e) => cambiarNombre(e.target.value)}
          className="placeholder:font-normal placeholder:text-sm  px-2 font-black ml-2  inline-block border-2 rounded-md border-primaryGreen"
        />
        <div className="w-full flex justify-end pr-2">
          <div className="  border-2 flex justify-center bg-background items-center rounded-md border-primaryGreen">
            <BsTrashFill size={20} onClick={() => eliminarSeccion()} />
          </div>
        </div>
      </div>
      <div className="-mt-[12px] border-2  border-primaryGreen rounded-md p-2 ">
        {establecimiento.secciones[index].mesas?.map((mesa, indexMesa) => (
          <MesaCard
            indexMesa={indexMesa}
            indexSeccion={index}
            establecimiento={establecimiento}
            setEstablecimiento={setEstablecimiento}
            key={index}
          />
        ))}
        <MesaFormulario anyadirMesa={(mesa: Mesa) => anyadirMesa(mesa)} />
      </div>
    </div>
  );
};
export default SeccionCard;
