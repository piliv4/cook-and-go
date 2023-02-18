import supabase from "@/server/client";
import { Ingrediente, Plato } from "@/types/types";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  let ingredientes: any[] = [];

  let { data: plato } = await supabase
    .from("Articulo")
    .select("*")
    .eq("id", "c51b9330-e72d-454c-9df9-266b94e2499a");

  let { data: ingredientesId } = await supabase
    .from("ArticuloIngrediente")
    .select("ingrediente_id")
    .eq("articulo_id", "c51b9330-e72d-454c-9df9-266b94e2499a");

  if (ingredientesId != null) {
    for (const id of ingredientesId) {
      let { data: ingrediente } = await supabase
        .from("Ingrediente")
        .select("*")
        .eq("id", id.ingrediente_id);
      ingrediente && ingredientes.push(ingrediente[0] as Ingrediente);
    }
  }

  return {
    props: {
      plato: plato && (plato[0] as Plato),
      ingredientes: ingredientes as Ingrediente[],
    },
  };
}

const DetallesPlato = ({
  plato,
  ingredientes,
}: {
  plato: Plato;
  ingredientes: any[];
}) => {
  return (
    <div>
      <h1>{plato.nombre}</h1>
      <p>{plato.descripcion}</p>
      <p>{plato.precio}</p>
      <ul>
        {ingredientes.map((ingrediente, index) => (
          <li key={ingrediente.id}>
            {index + 1}. {ingrediente.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetallesPlato;
