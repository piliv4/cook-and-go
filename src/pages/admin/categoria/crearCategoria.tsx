import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../../../server/client";
import { Categoria } from "@/types/types";

export default function Crearcategoria() {
  const [categoria, setcategoria] = useState<Categoria>({
    id: "",
    nombre: "",
    descripcion: "",
  });
  const router = useRouter();

  async function crearCategoria({ categoria }: { categoria: Categoria }) {
    const { data, error } = await supabase.from("Categoria").insert([
      {
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      },
    ]);
    if (!error) {
      router.push("/admin/categoria");
    }
  }
  function crearEnrutar() {
    crearCategoria({ categoria });
  }
  return (
    <div>
      <p>Nombre</p>
      <input
        type={"text"}
        onChange={(e) =>
          setcategoria({
            ...categoria,
            nombre: e.target.value.toString(),
          } as Categoria)
        }
      />
      <p>Desciprcion</p>
      <input
        type={"text"}
        onChange={(e) =>
          setcategoria({
            ...categoria,
            descripcion: e.target.value.toString(),
          } as Categoria)
        }
      ></input>
      <button onClick={() => crearEnrutar()}>Crear</button>
    </div>
  );
}
