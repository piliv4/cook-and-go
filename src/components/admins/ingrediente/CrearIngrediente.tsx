import supabase from "@/server/client";
import { Ingrediente } from "@/types/types";
import router from "next/router";
import { useState } from "react";

const CrearIngrediente = () => {
  //CAMBIAR CUANDO PUEDAS POR EL ENUMERADO CORRECTO
  const unidadMedida = ["kg", "g", "mg", "l", "ml", "unidades"];

  //El ingrediente a crear TENGO QUE AÑADIR COSAS MIRAR SI LO HAGO CON UN FORMULARIO!!!
  const [ingrediente, setIngrediente] = useState<Ingrediente>({
    id: "",
    nombre: "",
    descripcion: "",
    precioSuplemento: 0,
  });

  //CREAR INGREDIENTE
  async function crearIngrediente() {
    console.log("crear ingrediente");
    const { error } = await supabase.from("Ingrediente").insert([
      {
        nombre: ingrediente.nombre,
        descripcion: ingrediente.descripcion,
        precio_suplemento: ingrediente.precioSuplemento,
      },
    ]);
    !error ? router.replace(router.asPath) : console.log(error);
  }

  return (
    <div>
      <h1 className="text-lg font-thin">Crear ingrediente:</h1>
      <div className="flex flex-row gap-x-4 pl-6 w-full rounded-sm border-[1px] border-primaryOrange bg-">
        <div>
          <p className="font-light">Nombre:</p>
          <input
            type="text"
            className="border-[1px] border-black rounded-sm w-full"
            placeholder="Introduce un nombre"
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                nombre: e.target.value.toString(),
              } as Ingrediente)
            }
          />
        </div>
        <div>
          <p className="font-light">Descripción:</p>
          <textarea
            placeholder="Introduce una breve descripción"
            rows={1}
            className="border-[1px] border-black rounded-sm w-full resize-none"
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                descripcion: e.target.value.toString(),
              } as Ingrediente)
            }
          />
        </div>
        <div>
          <p className="font-light">Precio suplemento:</p>
          <input
            type="number"
            className="border-[1px] border-black rounded-sm w-full"
            placeholder="Introduce el precio por suplemento"
            onChange={(e) =>
              setIngrediente({
                ...ingrediente,
                precioSuplemento: parseInt(e.target.value),
              } as Ingrediente)
            }
          />
        </div>
        <div>
          <p className="font-light">Stock:</p>
          <input
            type="number"
            className="border-[1px] border-black rounded-sm w-full"
            placeholder="Introduce el stock actual"
          />
        </div>
        <div>
          <p className="font-light">Unidad medida:</p>
          <select className="border-[1px] border-black rounded-sm w-full">
            {unidadMedida.map((unidad, index) => (
              <option key={index} value={unidad}>
                {unidad}
              </option>
            ))}
          </select>
        </div>
        <button
          className="border-[1px] border-blue-600  rounded-sm m-4 mt-6 hover:bg-blue-600 hover:text-white"
          onClick={() => crearIngrediente()}
        >
          Crear Ingrediente
        </button>
      </div>
    </div>
  );
};
export default CrearIngrediente;
