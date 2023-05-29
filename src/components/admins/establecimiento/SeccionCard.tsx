import { useState } from "react";
import MesaCard from "./MesaCard";
import { Establecimiento, Mesa, Seccion } from "@/types/Establecimiento";
import MesaFormulario from "./MesaFormulario";

const SeccionCard = ({
  index,
  establecimiento,
  setEstablecimiento,
}: {
  index: number;
  establecimiento: Establecimiento;
  setEstablecimiento: Function;
}) => {
  function anyadirMesa(mesa: Mesa) {
    let establecimientoCopia = { ...establecimiento };
    establecimientoCopia.secciones[index].mesas == undefined
      ? //Si las mesas no estan definidas entonces declaramos el array
        (establecimientoCopia.secciones[index].mesas = [mesa])
      : //Si estan definidas entonces pusheamos la nueva mesa
        establecimientoCopia.secciones[index].mesas.push(mesa);
    setEstablecimiento(establecimientoCopia);
  }

  return (
    <div>
      <input className="mt-4 px-2 font-black ml-2 bg-background inline-block" />
      <div className="-mt-[12px] border-2  border-secondaryGreen ">
        {establecimiento.secciones[index].mesas?.map((mesa, index) => (
          <MesaCard index={index} mesa={mesa} key={index} />
        ))}
        <MesaFormulario anyadirMesa={(mesa: Mesa) => anyadirMesa(mesa)} />
      </div>
    </div>
  );
};
export default SeccionCard;
