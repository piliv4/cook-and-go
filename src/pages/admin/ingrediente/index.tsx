import Link from "next/link";
import supabase from "../../../server/client";
import { Ingrediente } from "@/types/types";
import IngredienteCard from "@/components/admins/ingrediente/IngredienteCard";
import { useState } from "react";

export async function getServerSideProps() {
  let { data } = await supabase.from("Ingrediente").select("*");
  return {
    props: {
      ingredientes: data,
    },
  };
}

export default function IngredientesPagina({
  ingredientes,
}: {
  ingredientes: Ingrediente[];
}) {
  const [ingredientesState, setIngredientesState] = useState(ingredientes);
  return (
    <div>
      <Link href={"/admin/ingrediente/crearIngrediente"}>
        <p>Crear nuevo ingrediente</p>
      </Link>
      <br />
      <h1>Listado de ingredientes</h1>
      <div>buscador</div>
      <div className="mx-2">
        {ingredientesState.map((ingrediente) => (
          <IngredienteCard key={ingrediente.id} ingrediente={ingrediente} />
        ))}
      </div>
    </div>
  );
}
