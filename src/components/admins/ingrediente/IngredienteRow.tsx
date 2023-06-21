import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Ingrediente } from "@/types/Ingrediente";
import { editarIngrediente, eliminarIngrediente } from "@/api/ingrediente";
import { esNumeroPositivo, esVacio } from "@/validations/validation";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";
import { unidadMedida } from "@/types/enum";

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

    let eStock = esNumeroPositivo(ingredienteEditar.stock + "", "stock");
    setErrorStock(eStock ? eStock : "");

    if (eNombre || ePrecio || eStock) {
      return false;
    }
    return true;
  }

  function editar() {
    if (validarCampos()) {
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
              className="w-full focus:outline-none"
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
              className="w-full focus:outline-none"
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
              className="w-full focus:outline-none"
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

      <td className="border border-primaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.stock}</p>
        ) : (
          <InputErrorEnvoltorio error={errorStock}>
            <input
              type={"number"}
              defaultValue={ingrediente.stock}
              className="w-full focus:outline-none"
              onChange={(e) =>
                setIngredienteEditar({
                  ...ingredienteEditar,
                  stock: parseInt(e.target.value),
                } as Ingrediente)
              }
            ></input>
          </InputErrorEnvoltorio>
        )}
      </td>

      <td className="border border-primaryGreen pl-2">
        {indexGlobal != index ? (
          <p>{ingrediente.unidad}</p>
        ) : (
          <InputErrorEnvoltorio error="">
            <select
              className=" text-right "
              defaultValue={ingrediente.unidad}
              onChange={(e) =>
                setIngredienteEditar({
                  ...ingredienteEditar,
                  unidad: e.target.value,
                } as Ingrediente)
              }
            >
              {unidadMedida.map((unidad, index) => (
                <option key={index} value={unidad}>
                  {unidad}
                </option>
              ))}
            </select>
          </InputErrorEnvoltorio>
        )}
      </td>

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
