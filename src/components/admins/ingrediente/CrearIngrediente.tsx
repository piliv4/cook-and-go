import { Ingrediente } from "@/types/Ingrediente";
import { useState, useContext } from "react";
import { crearIngrediente } from "@/api/ingrediente";
import { esNumeroPositivo, esVacio } from "@/validations/validation";
import InputErrorEnvoltorio from "../ui/InputErrorEnvoltorio";
import { unidadMedida } from "@/types/enum";

import { EstablecimientoContext } from "@/context/EstablecimientoContext";

const CrearIngrediente = () => {
  const ingredienteVacio = {
    id: "",
    nombre: "",
    descripcion: "",
    precioSuplemento: 0,
    stock: 0,
    unidad: "kg",
  };
  const [ingrediente, setIngrediente] = useState<Ingrediente>(ingredienteVacio);
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorPrecioSuplemento, setErrorPrecioSuplemento] = useState("");
  const [errorStock, setErrorStock] = useState("");

  function validarCampos() {
    let eNombre = esVacio(ingrediente.nombre, "nombre");
    setErrorNombre(eNombre ? eNombre : "");

    let ePrecio = esNumeroPositivo(
      ingrediente.precioSuplemento + "",
      "precio suplemento"
    );
    setErrorPrecioSuplemento(ePrecio ? ePrecio : "");

    let eStock = esNumeroPositivo(ingrediente.stock + "", "precio suplemento");
    setErrorStock(eStock ? eStock : "");

    if (eNombre || ePrecio || eStock) {
      return false;
    }
    return true;
  }

  //CREAR INGREDIENTE
  async function crear() {
    if (validarCampos()) {
      crearIngrediente(ingrediente, establecimientoGlobal.id);
      setIngrediente(ingredienteVacio);
    }
  }

  return (
    <div>
      <h1 className="text-lg pl-6 font-black">Nuevo ingrediente</h1>
      <div className="flex flex-row gap-x-4 font-light pl-6 w-full bg-primaryGreen  border-[1px] border-pr rounded-full border-primaryGreen ">
        <div className="w-full mt-1">
          <p className="text-white">Nombre:</p>
          <InputErrorEnvoltorio error={errorNombre}>
            <input
              type="text"
              className="focus:outline-none"
              placeholder="Introduce un nombre"
              value={ingrediente.nombre}
              onChange={(e) =>
                setIngrediente({
                  ...ingrediente,
                  nombre: e.target.value.toString(),
                } as Ingrediente)
              }
            />
          </InputErrorEnvoltorio>
        </div>
        <div className="w-full mt-1">
          <p className="text-white">Descripción:</p>
          <textarea
            placeholder="Introduce una breve descripción"
            rows={1}
            className="pl-2 pr-20 border-[1px] rounded-md overflow-hidden resize-none focus:outline-none"
            value={ingrediente.descripcion}
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                descripcion: e.target.value.toString(),
              } as Ingrediente)
            }
          />
        </div>
        <div className="w-full mt-1">
          <p className="text-white">Precio suplemento:</p>
          <InputErrorEnvoltorio error={errorPrecioSuplemento}>
            <input
              type="number"
              className="focus:outline-none"
              placeholder="Introduce el pps"
              value={ingrediente.precioSuplemento}
              onChange={(e) =>
                setIngrediente({
                  ...ingrediente,
                  precioSuplemento: parseFloat(e.target.value),
                } as Ingrediente)
              }
            />
          </InputErrorEnvoltorio>
        </div>
        <div className="w-full mt-1">
          <p className="text-white">Stock:</p>
          <InputErrorEnvoltorio error={errorStock}>
            <input
              type="number"
              className="focus:outline-none"
              placeholder="Introduce el stock actual"
              onChange={(e) =>
                setIngrediente({
                  ...ingrediente,
                  stock: parseFloat(e.target.value),
                } as Ingrediente)
              }
            />
          </InputErrorEnvoltorio>
        </div>
        <div className="w-full mt-1">
          <p className="text-white">Unidad de medida:</p>
          <select
            className="pl-10 pr-2  border-[1px] rounded-md text-right "
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
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
        </div>
        <button
          className="w-full border-[1px] py-1 bg-primaryOrange border-primaryGreen text-white font-black rounded-full  m-4 mt-5 hover:bg-secondaryOrange "
          onClick={() => crear()}
        >
          Crear Ingrediente
        </button>
      </div>
    </div>
  );
};
export default CrearIngrediente;
