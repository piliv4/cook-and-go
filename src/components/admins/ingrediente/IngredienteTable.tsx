import { Ingrediente } from "@/types/types";
import IngredienteRow from "./IngredienteRow";
import { useState } from "react";

const IngredienteTable = ({ ingrediente }: { ingrediente: Ingrediente[] }) => {
  const [editarIndex, setEditarIndex] = useState(-1);
  return (
    <div className="w-full">
      <table className="w-full mt-2 border-collapse ">
        <thead>
          <tr className=" bg-secondaryGreen text-white  rounded-t-full ">
            <th className=" py-1 rounded-tl-full font-normal">Nombre</th>
            <th className="border border-background">Descripción</th>
            <th className="border border-background">Precio suplemento</th>
            <th className="border border-background">Stock</th>
            <th className="border border-background">Unidad Medida</th>
            <th className="border border-background">Editar</th>
            <th className="border border-background rounded-tr-full">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody>
          {ingrediente.map((ingrediente, index) => (
            <IngredienteRow
              key={ingrediente.id}
              ingrediente={ingrediente}
              index={index}
              indexGlobal={editarIndex}
              setIndexGlobal={setEditarIndex}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default IngredienteTable;
