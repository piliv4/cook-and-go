import { Categoria, Ingrediente } from "@/types/types";
import { useRouter } from "next/router";
import { useState } from "react";
import supabase from "../../../server/client";

type Plato = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  ingredientes: string[];
};

export async function getServerSideProps() {
  let { data: categorias } = await supabase.from("Categoria").select("*");
  let { data: ingredientes } = await supabase.from("Ingrediente").select("*");
  console.log("mis ingredientes: " + ingredientes);
  return {
    props: {
      categorias: categorias,
      ingredientes: ingredientes,
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
  console.log(plato.ingredientes);
  data &&
    plato.ingredientes.map(async (ingrediente) => {
      await supabase.from("ArticuloIngrediente").insert([
        {
          articulo_id: (data[0] as Plato).id,
          ingrediente_id: ingrediente,
        },
      ]);
    });
}

export default function CrearIngrediente({
  categorias,
  ingredientes,
}: {
  categorias: Categoria[];
  ingredientes: Ingrediente[];
}) {
  const [plato, setPlato] = useState<Plato>({
    id: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    categoria: "",
    ingredientes: [],
  });

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

      <div>
        {ingredientes.map((ingrediente) => (
          <div key={ingrediente.id}>
            <input
              type="checkbox"
              id={ingrediente.id}
              name={ingrediente.id}
              value={ingrediente.id}
              onClick={(e) => {
                (e.target as HTMLInputElement).checked
                  ? setPlato({
                      ...plato,
                      ingredientes: plato.ingredientes.concat([
                        (e.target as HTMLInputElement).value,
                      ]),
                    } as Plato)
                  : console.log("Eliminar plato");
              }}
            />
            <label>{ingrediente.nombre}</label>
          </div>
        ))}
      </div>

      <button onClick={() => crearEnrutar()}>Crear</button>
    </div>
  );
}
