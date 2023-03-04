import { Ingrediente } from "@/types/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import supabase from "@/server/client";

const IngredienteRow = ({ ingrediente }: { ingrediente: Ingrediente }) => {
  const [editar, setEditar] = useState(false);
  const router = useRouter();
  const [ingredienteEditar, setIngredienteEditar] =
    useState<Ingrediente>(ingrediente);

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
      setEditar(false);
    }
  }

  return (
    <tr
      key={ingrediente.id}
      className="font-light hover:bg-secondaryOrange bg-white"
    >
      <td className="border border-secondaryGreen pl-2">
        {!editar ? (
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
        {!editar ? (
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
        {!editar ? (
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
          {!editar ? (
            <BsFillPencilFill
              className=" fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => {
                setEditar(true);
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
          {!editar ? (
            <BsTrashFill className="fill-primaryOrange hover:fill-white transition duration-150" />
          ) : (
            <AiOutlineClose
              className="fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => setEditar(false)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
export default IngredienteRow;
