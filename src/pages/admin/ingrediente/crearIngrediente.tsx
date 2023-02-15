import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../../../server/client";

type Ingrediente = {
  nombre: string;
  descripcion: string;
  precioSuplemento: number;
};

async function crearIngrediente({ ingrediente }: { ingrediente: Ingrediente }) {
  const { data, error } = await supabase.from("Ingrediente").insert([
    {
      nombre: ingrediente.nombre,
      descripcion: ingrediente.descripcion,
      precio_suplemento: ingrediente.precioSuplemento,
    },
  ]);
}

export default function CrearIngrediente() {
  const [ingrediente, setIngrediente] = useState<Ingrediente>({
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
    <div>
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
