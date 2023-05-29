import { Mesa } from "@/types/Establecimiento";
import { useState } from "react";

const MesaFormulario = ({ anyadirMesa }: { anyadirMesa: Function }) => {
  const MESA_DEFAULT = { id: "", tipo: "Mesa", comensales: 1 };
  const [mesa, setMesa] = useState<Mesa>(MESA_DEFAULT);
  return (
    <div className="flex flex-row border-2 border-primaryOrange m-2 mt-4 p-1">
      <select
        className=" bg-transparent"
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
          className="w-6 text-right border-2"
        ></input>
        <p className="text-center">comensales</p>
      </div>
      <button
        className="bg-primaryOrange px-2 rounded-md font-black text-white"
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
