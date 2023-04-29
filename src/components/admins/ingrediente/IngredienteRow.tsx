import { useRouter } from "next/router";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Ingrediente } from "@/types/Ingrediente";
import { editarIngrediente, eliminarIngrediente } from "@/api/ingrediente";

const IngredienteRow = ({
  ingrediente,
  indexGlobal,
  setIndexGlobal,
  index,
}: {
  ingrediente: Ingrediente;
  indexGlobal: number;
  setIndexGlobal: Function;
  index: number;
}) => {
  const router = useRouter();
  const [ingredienteEditar, setIngredienteEditar] =
    useState<Ingrediente>(ingrediente);

  async function eliminar() {
    try {
      await eliminarIngrediente(ingrediente.id);
    } catch (error) {
      console.log("Error al eliminar el ingrediente");
    }
    router.replace(router.asPath);
  }
  async function editar() {
    try {
      await editarIngrediente(ingredienteEditar);
    } catch (error) {
      console.log("Error al editar el ingrediente");
    }
    router.replace(router.asPath);
    setIndexGlobal(-1);
  }

  return (
    <tr
      key={ingrediente.id}
      className="font-light hover:bg-secondaryOrange bg-white"
    >
      <td className="border border-secondaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.nombre}</p>
        ) : (
          <input
            type={"text"}
            defaultValue={ingrediente.nombre}
            onChange={(e) =>
              setIngredienteEditar({
                ...ingredienteEditar,
                nombre: e.target.value.toString(),
              } as Ingrediente)
            }
          ></input>
        )}
      </td>
      <td className="border border-secondaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.descripcion}</p>
        ) : (
          <input
            type={"text"}
            defaultValue={ingrediente.descripcion}
            onChange={(e) =>
              setIngredienteEditar({
                ...ingredienteEditar,
                descripcion: e.target.value.toString(),
              } as Ingrediente)
            }
          ></input>
        )}
      </td>

      <td className="border border-secondaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.precioSuplemento}</p>
        ) : (
          <input
            type={"number"}
            defaultValue={ingrediente.precioSuplemento}
            onChange={(e) =>
              setIngredienteEditar({
                ...ingredienteEditar,
                precioSuplemento: parseInt(e.target.value),
              } as Ingrediente)
            }
          ></input>
        )}
      </td>

      <td className="border border-secondaryGreen pl-2">200</td>

      <td className="border border-secondaryGreen pl-2">kg</td>

      <td className="border border-secondaryGreen ">
        <div className="flex justify-center items-center">
          {indexGlobal != index ? (
            <BsFillPencilFill
              className=" fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => {
                setIndexGlobal(index);
              }}
            />
          ) : (
            <BiSave
              className=" fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => {
                editar();
              }}
            />
          )}
        </div>
      </td>
      <td className="border border-secondaryGreen">
        <div className="flex justify-center items-center h-full">
          {indexGlobal != index ? (
            <BsTrashFill
              className="fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => eliminar()}
            />
          ) : (
            <AiOutlineClose
              className="fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => setIndexGlobal(-1)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
export default IngredienteRow;
