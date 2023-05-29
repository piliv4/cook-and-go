import { Mesa } from "@/types/Establecimiento";
import { useState } from "react";

const MesaFormulario = ({ anyadirMesa }: { anyadirMesa: Function }) => {
  const MESA_DEFAULT = { id: "", tipo: "Mesa", comensales: 1 };
  const [mesa, setMesa] = useState<Mesa>(MESA_DEFAULT);
  return (
    <div className="flex flex-row  bg-secondaryGreen rounded-full mx-2 pl-6 mt-4 p-1">
      <select
        className=" bg-transparent mr-8"
        value={mesa.tipo}
        onChange={(e) => setMesa({ ...mesa, tipo: e.target.value })}
      >
        <option>Mesa</option>
        <option>Barra</option>
        <option>Barril</option>
      </select>

      <div className="w-full flex flex-row justify-center">
        <input
          type="number"
          value={mesa.comensales}
          onChange={(e) =>
            setMesa({ ...mesa, comensales: parseInt(e.target.value) })
          }
          className="w-6 text-center bg-background   border-[1px] border-primaryGreen rounded-md mr-1 "
        ></input>
        <p className="text-center">comensales</p>
      </div>
      <button
        className="bg-primaryGreen  px-4 rounded-full  font-black text-white"
        onClick={() => {
          anyadirMesa(mesa);
          setMesa(MESA_DEFAULT);
        }}
      >
        Añadir
      </button>
    </div>
  );
};
export default MesaFormulario;
