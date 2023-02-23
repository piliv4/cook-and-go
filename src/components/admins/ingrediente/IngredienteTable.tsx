import { Ingrediente } from "@/types/types";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";

const IngredienteTable = ({ ingrediente }: { ingrediente: Ingrediente[] }) => {
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
          {ingrediente.map((ingrediente) => (
            <tr
              key={ingrediente.id}
              className="font-light hover:bg-secondaryOrange "
            >
              <td className="border border-secondaryGreen pl-2">
                {ingrediente.nombre}
              </td>
              <td className="border border-secondaryGreen pl-2">
                {ingrediente.descripcion}
              </td>

              <td className="border border-secondaryGreen pl-2">
                {ingrediente.precioSuplemento}
              </td>

              <td className="border border-secondaryGreen pl-2">200</td>

              <td className="border border-secondaryGreen pl-2">kg</td>

              <td className="border border-secondaryGreen ">
                <div className="flex justify-center items-center">
                  <BsFillPencilFill className=" fill-primaryOrange hover:fill-white transition duration-150" />
                </div>
              </td>
              <td className="border border-secondaryGreen">
                <div className="flex justify-center items-center h-full">
                  <BsTrashFill className="fill-primaryOrange hover:fill-white transition duration-150" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default IngredienteTable;
