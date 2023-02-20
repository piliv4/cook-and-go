import supabase from "@/server/client";
import { Ingrediente } from "@/types/types";
import router from "next/router";
import { useState } from "react";
import IngredienteCard from "./IngredienteCard";

const CrearIngrediente = ({
  ingredienteAModificar,
}: {
  ingredienteAModificar: Ingrediente | null;
}) => {
  //CAMBIAR CUANDO PUEDAS POR EL ENUMERADO CORRECTO
  const unidadMedida = ["kg", "g", "mg", "l", "ml", "unidades"];

  const [visible, setVisible] = useState(true);
  //El ingrediente a crear TENGO QUE AÑADIR COSAS MIRAR SI LO HAGO CON UN FORMULARIO!!!
  const [ingrediente, setIngrediente] = useState<Ingrediente>(
    ingredienteAModificar
      ? ingredienteAModificar
      : {
          id: "",
          nombre: "",
          descripcion: "",
          precioSuplemento: 0,
        }
  );

  //MODIFICAR INGREDIENTE
  async function modificarIngrediente() {
    console.log("modificando ingrediente");
    const { error } = await supabase
      .from("Ingrediente")
      .update([
        {
          nombre: ingrediente.nombre,
          descripcion: ingrediente.descripcion,
          precio_suplemento: ingrediente.precioSuplemento,
        },
      ])
      .eq("id", ingredienteAModificar?.id);
    !error ? router.replace(router.asPath) : console.log(error);
    setVisible(false);
  }

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

  return visible ? (
    <div className="grid grid-cols-6 gap-1 px-2">
      <div>
        <p>Nombre:</p>
        <input
          type="text"
          className="border-[1px] border-black rounded-sm w-full"
          placeholder="Introduce un nombre"
          defaultValue={ingredienteAModificar?.nombre}
          onChange={(e) =>
            setIngrediente({
              ...ingrediente,
              nombre: e.target.value.toString(),
            } as Ingrediente)
          }
        />
      </div>
      <div>
        <p>Descripcion:</p>
        <textarea
          placeholder="Introduce una breve descripción"
          rows={1}
          className="border-[1px] border-black rounded-sm w-full"
          defaultValue={ingredienteAModificar?.descripcion}
          onChange={(e) =>
            setIngrediente({
              ...ingrediente,
              descripcion: e.target.value.toString(),
            } as Ingrediente)
          }
        />
      </div>
      <div>
        <p>Precio suplemento:</p>
        <input
          type="number"
          className="border-[1px] border-black rounded-sm w-full"
          placeholder="Introduce el precio por suplemento"
          defaultValue={ingredienteAModificar?.precioSuplemento}
          onChange={(e) =>
            setIngrediente({
              ...ingrediente,
              precioSuplemento: parseInt(e.target.value),
            } as Ingrediente)
          }
        />
      </div>
      <div>
        <p>Stock:</p>
        <input
          type="number"
          className="border-[1px] border-black rounded-sm w-full"
          placeholder="Introduce el stock actual"
        />
      </div>
      <div>
        <p>unidad medida:</p>
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
        onClick={() =>
          ingredienteAModificar ? modificarIngrediente() : crearIngrediente()
        }
      >
        {ingredienteAModificar ? "Guardar" : "Crear Ingrediente"}
      </button>
    </div>
  ) : (
    <IngredienteCard ingrediente={ingrediente} />
  );
};
export default CrearIngrediente;
