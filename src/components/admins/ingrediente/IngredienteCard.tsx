import supabase from "@/server/client";
import { Ingrediente } from "@/types/types";
import router from "next/router";
import { useState } from "react";
import CrearIngrediente from "./CrearIngrediente";

const IngredienteCard = ({ ingrediente }: { ingrediente: Ingrediente }) => {
  const [modificar, setModificar] = useState(false);
  async function eliminarIngrediente() {
    try {
      const { error } = await supabase
        .from("Ingrediente")
        .delete()
        .eq("id", ingrediente.id);
      if (!error) {
        router.replace(router.asPath);
      }
    } catch (e) {
      console.log("Erroe al eliminar el ingrediente");
    }
  }
  return !modificar ? (
    <div className="grid grid-cols-[10%_40%_10%_10%_10%_9%_9%] w-full gap-x-1 hover:bg-blue-200 px-2">
      <p>{ingrediente.nombre}</p>
      <p>{ingrediente.descripcion}</p>
      <p>{ingrediente.precioSuplemento}</p>
      <p>stock</p>
      <p>unidad</p>
      <button
        className="border-[1px] border-blue-600   hover:bg-blue-600 hover:text-white w-full"
        onClick={() => {
          setModificar(true);
        }}
      >
        modificar
      </button>
      <button
        className="border-[1px] border-blue-600   hover:bg-blue-600 hover:text-white w-full"
        onClick={() => eliminarIngrediente()}
      >
        eliminar
      </button>
    </div>
  ) : (
    <div>
      <CrearIngrediente ingredienteAModificar={ingrediente} />
    </div>
  );
};
export default IngredienteCard;
