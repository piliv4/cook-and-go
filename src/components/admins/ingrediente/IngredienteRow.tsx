import { Ingrediente } from "@/types/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import supabase from "@/server/client";

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

  async function borrarIngrediente() {
    const { error: error1 } = await supabase
      .from("ArticuloIngrediente")
      .delete()
      .eq("ingrediente_id", ingrediente?.id);
    console.log(error1);
    if (!error1) {
      const { error } = await supabase
        .from("Ingrediente")
        .delete()
        .eq("id", ingrediente?.id);
      if (!error) {
        router.replace(router.asPath);
      }
    }
  }
  async function editarIngrediente() {
    const { error } = await supabase
      .from("Ingrediente")
      .update([
        {
          nombre: ingredienteEditar.nombre,
          descripcion: ingredienteEditar.descripcion,
          precio_suplemento: ingredienteEditar.precioSuplemento,
        },
      ])
      .eq("id", ingrediente?.id);
    if (!error) {
      router.replace(router.asPath);
      setIndexGlobal(-1);
    }
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
                editarIngrediente();
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
              onClick={() => borrarIngrediente()}
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
