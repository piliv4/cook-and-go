import { Categoria } from "@/types/types";
import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../../../server/client";

type Plato = {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  ingredientes: string[];
};

export async function getStaticProps() {
  let { data } = await supabase.from("Categoria").select("*");
  return {
    props: {
      categorias: data,
    },
  };
}

async function crearIngrediente({ plato }: { plato: Plato }) {
  const { data, error } = await supabase
    .from("Articulo")
    .insert([
      {
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        precio: plato.precio,
        categoria_id: plato.categoria,
      },
    ])
    .select();
  console.log(plato);
  console.log(error);

  // plato.ingredientes.map(async (ingrediente) => {
  //   await supabase.from("ArticuloIngrediente").insert([
  //     {
  //       articulo_id: ,
  //       ingrediente_id: ingrediente,
  //     },
  //   ]);
  // });
}

export default function CrearIngrediente({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const [plato, setPlato] = useState<Plato>({
    nombre: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    ingredientes: [],
  });
  const router = useRouter();

  function crearEnrutar() {
    crearIngrediente({ plato });
    // router.push("/admin/ingrediente");
  }
  return (
    <div>
      <p>Nombre</p>
      <input
        type={"text"}
        onChange={(e) =>
          setPlato({
            ...plato,
            nombre: e.target.value.toString(),
          } as Plato)
        }
      />

      <p>Desciprcion</p>
      <input
        type={"text"}
        onChange={(e) =>
          setPlato({
            ...plato,
            descripcion: e.target.value.toString(),
          } as Plato)
        }
      ></input>

      <p>Precio suplemento</p>
      <input
        type={"number"}
        onChange={(e) =>
          setPlato({
            ...plato,
            precio: parseInt(e.target.value),
          } as Plato)
        }
      />

      <select
        onChange={(e) => {
          setPlato({
            ...plato,
            categoria: e.target.value,
          } as Plato);
        }}
      >
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>
      <button onClick={() => crearEnrutar()}>Crear</button>
    </div>
  );
}
