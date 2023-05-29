import { Mesa } from "@/types/Establecimiento";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";

const MesaFormulario = ({ anyadirMesa }: { anyadirMesa: Function }) => {
  const [mesa, setMesa] = useState<Mesa>({} as Mesa);
  return (
    <div className="flex flex-row border-2 border-primaryOrange m-2 mt-4 p-1">
      <select
        className=" bg-transparent"
        onChange={(e) => setMesa({ ...mesa, tipo: e.target.value })}
      >
        <option>Mesa</option>
        <option>Barra</option>
        <option>Barril</option>
      </select>

      <div className="w-full flex flex-row justify-center">
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => setMesa({ ...mesa, comensales: e.target.value })}
          className="w-6 text-right border-2"
        ></input>
        <p className="text-center">comensales</p>
      </div>
      <button
        className="bg-primaryOrange px-2 rounded-md font-black text-white"
        onClick={() => {
          anyadirMesa(mesa);
          setMesa({} as Mesa);
        }}
      >
        Añadir
      </button>
    </div>
  );
};
export default MesaFormulario;
