import { Ingrediente } from "@/types/Ingrediente";
import IngredienteRow from "./IngredienteRow";
import { useEffect, useState } from "react";

const IngredienteTable = ({ ingrediente }: { ingrediente: Ingrediente[] }) => {
  const [editarIndex, setEditarIndex] = useState(-1);
  useEffect(() => {
    return () => {
      setEditarIndex(-1);
    };
  }, [ingrediente]);

  return (
    <div className="w-full ">
      <table className="w-full mt-2 border-collapse ">
        <thead>
          <tr className=" bg-primaryGreen text-white  rounded-t-full ">
            <th className=" py-1 rounded-tl-full ">Nombre</th>
            <th className="border border-background sm:table-cell hidden">
              Descripción
            </th>
            <th className="border border-background sm:table-cell   hidden">
              Precio suplemento
            </th>
            <th className="border border-background">Stock</th>
            <th className="border border-background">Unidad Medida</th>
            <th className="border border-background ">
              <p className="sm:visible invisible">Editar</p>
            </th>
            <th className="border border-background rounded-tr-full">
              <p className="sm:visible invisible">Eliminar</p>
            </th>
          </tr>
        </thead>
        <tbody className="">
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
