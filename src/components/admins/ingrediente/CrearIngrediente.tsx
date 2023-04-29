import { Ingrediente } from "@/types/Ingrediente";
import { useState } from "react";
import { crearIngrediente } from "@/api/ingrediente";
import router from "next/router";

const CrearIngrediente = () => {
  //CAMBIAR CUANDO PUEDAS POR EL ENUMERADO CORRECTO
  const unidadMedida = ["kg", "g", "mg", "l", "ml", "unidades"];

  //El ingrediente a crear TENGO QUE AÑADIR COSAS MIRAR SI LO HAGO CON UN FORMULARIO!!!

  const ingredienteVacio = {
    id: "",
    nombre: "",
    descripcion: "",
    precioSuplemento: 0,
  };
  const [ingrediente, setIngrediente] = useState<Ingrediente>(ingredienteVacio);

  function validarCampos() {
    if (ingrediente.nombre == null || ingrediente.nombre == "") {
      console.log(ingrediente);
      return false;
    }
    if (ingrediente.precioSuplemento <= 0) {
      console.log(ingrediente.precioSuplemento);
      return false;
    }
    return true;
  }

  //CREAR INGREDIENTE
  async function crear() {
    if (validarCampos()) {
      try {
        await crearIngrediente(ingrediente);
      } catch (error) {
        console.log("error al crear un ingrediente");
      }
      router.replace(router.asPath);
      setIngrediente(ingredienteVacio);
    }
  }

  return (
    <div>
      <h1 className="text-lg font-black">Nuevo ingrediente</h1>
      <div className="flex flex-row gap-x-4 pl-6 w-full rounded-sm border-[1px] border-pr border-primaryGreen ">
        <div className="w-full">
          <p>Nombre:</p>
          <input
            type="text"
            className="border-[1px] border-black rounded-sm w-full"
            placeholder="Introduce un nombre"
            value={ingrediente.nombre}
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                nombre: e.target.value.toString(),
              } as Ingrediente)
            }
          />
        </div>
        <div className="w-full">
          <p>Descripción:</p>
          <textarea
            placeholder="Introduce una breve descripción"
            rows={1}
            className="border-[1px] border-black rounded-sm w-full resize-none"
            value={ingrediente.descripcion}
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                descripcion: e.target.value.toString(),
              } as Ingrediente)
            }
          />
        </div>
        <div className="w-full">
          <p>Precio suplemento:</p>
          <input
            type="number"
            className="border-[1px] border-black rounded-sm w-full"
            placeholder="Introduce el precio por suplemento"
            value={ingrediente.precioSuplemento}
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                precioSuplemento: parseFloat(e.target.value),
              } as Ingrediente)
            }
          />
        </div>
        <div className="w-full">
          <p>Stock:</p>
          <input
            type="number"
            className="border-[1px] border-black rounded-sm w-full"
            placeholder="Introduce el stock actual"
            //FALTA AÑADIR EL STOCK
          />
        </div>
        <div className="w-full">
          <p>Unidad de medida:</p>
          <select className="border-[1px] border-black rounded-sm w-full">
            {unidadMedida.map((unidad, index) => (
              <option key={index} value={unidad}>
                {unidad}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full border-[1px] py-1 bg-primaryOrange text-white font-black rounded-full  m-4 mt-5 hover:bg-secondaryOrange "
          onClick={() => crear()}
        >
          Crear Ingrediente
        </button>
      </div>
    </div>
  );
};
export default CrearIngrediente;
