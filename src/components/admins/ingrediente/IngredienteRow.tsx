import { useRouter } from "next/router";
import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Ingrediente } from "@/types/Ingrediente";
import { editarIngrediente, eliminarIngrediente } from "@/api/ingrediente";
import { esNumeroPositivo, esVacio } from "@/validations/validation";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";

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

  const [errorNombre, setErrorNombre] = useState("");
  const [errorPrecioSuplemento, setErrorPrecioSuplemento] = useState("");
  const [errorStock, setErrorStock] = useState("");

  function validarCampos() {
    let eNombre = esVacio(ingredienteEditar.nombre, "nombre");
    setErrorNombre(eNombre ? eNombre : "");

    let ePrecio = esNumeroPositivo(
      ingredienteEditar.precioSuplemento + "",
      "precio suplemento"
    );
    setErrorPrecioSuplemento(ePrecio ? ePrecio : "");

    // let eStock = esNumeroPositivo(ingredienteEditar.stock + "", "precio suplemento");
    // setErrorStock(eStock ? eStock : "");

    if (
      eNombre ||
      ePrecio
      // || eStock
    ) {
      return false;
    }
    return true;
  }

  function editar() {
    if (validarCampos()) {
      console.log("culo");
      editarIngrediente(ingredienteEditar);
      setIndexGlobal(-1);
    }
  }

  return (
    <tr key={ingrediente.id} className=" hover:bg-secondaryOrange bg-white">
      <td className="border border-primaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.nombre}</p>
        ) : (
          <InputErrorEnvoltorio error={errorNombre}>
            <input
              type={"text"}
              defaultValue={ingrediente.nombre}
              className="w-full"
              onChange={(e) =>
                setIngredienteEditar({
                  ...ingredienteEditar,
                  nombre: e.target.value.toString(),
                } as Ingrediente)
              }
            ></input>
          </InputErrorEnvoltorio>
        )}
      </td>
      <td className="border border-primaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.descripcion}</p>
        ) : (
          <InputErrorEnvoltorio error="">
            <input
              type={"text"}
              defaultValue={ingrediente.descripcion}
              className="w-full"
              onChange={(e) =>
                setIngredienteEditar({
                  ...ingredienteEditar,
                  descripcion: e.target.value.toString(),
                } as Ingrediente)
              }
            ></input>
          </InputErrorEnvoltorio>
        )}
      </td>

      <td className="border border-primaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.precioSuplemento}</p>
        ) : (
          <InputErrorEnvoltorio error={errorPrecioSuplemento}>
            <input
              type={"number"}
              defaultValue={ingrediente.precioSuplemento}
              className="w-full"
              onChange={(e) =>
                setIngredienteEditar({
                  ...ingredienteEditar,
                  precioSuplemento: parseInt(e.target.value),
                } as Ingrediente)
              }
            ></input>
          </InputErrorEnvoltorio>
        )}
      </td>

      <td className="border border-primaryGreen pl-2">200</td>

      <td className="border border-primaryGreen pl-2">kg</td>

      <td className="border border-primaryGreen ">
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
      <td className="border border-primaryGreen">
        <div className="flex justify-center items-center h-full">
          {indexGlobal != index ? (
            <BsTrashFill
              className="fill-primaryOrange hover:fill-white transition duration-150"
              onClick={() => eliminarIngrediente(ingrediente.id)}
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
