import { useRouter } from "next/router";
import { useState } from "react";
import { Ingrediente } from "@/types/types";
import supabase from "../../../server/client";

async function crearIngrediente({ ingrediente }: { ingrediente: Ingrediente }) {
  const { data, error } = await supabase.from("Ingrediente").insert([
    {
      nombre: ingrediente.nombre,
      descripcion: ingrediente.descripcion,
      precio_suplemento: ingrediente.precioSuplemento,
    },
  ]);
}

export default function CrearIngredientePage() {
  const [ingrediente, setIngrediente] = useState<Ingrediente>({
    id: "",
    nombre: "",
    descripcion: "",
    precioSuplemento: 0,
  });
  const router = useRouter();

  function crearEnrutar() {
    crearIngrediente({ ingrediente });
    router.push("/admin/ingrediente");
  }
  return (
    <div className="flex flex-row">
      <p>Nombre</p>
      <input
        type={"text"}
        onChange={(e) =>
          setIngrediente({
            ...ingrediente,
            nombre: e.target.value.toString(),
          } as Ingrediente)
        }
      />
      <p>Desciprcion</p>
      <input
        type={"text"}
        onChange={(e) =>
          setIngrediente({
            ...ingrediente,
            descripcion: e.target.value.toString(),
          } as Ingrediente)
        }
      ></input>
      <p>Precio suplemento</p>
      <input
        type={"number"}
        onChange={(e) =>
          setIngrediente({
            ...ingrediente,
            precioSuplemento: parseInt(e.target.value),
          } as Ingrediente)
        }
      />
      <button onClick={() => crearEnrutar()}>Crear</button>
    </div>
  );
}
