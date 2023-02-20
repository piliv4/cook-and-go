import Link from "next/link";
import supabase from "../../../server/client";
import { Ingrediente } from "@/types/types";
import IngredienteCard from "@/components/admins/ingrediente/IngredienteCard";
import { useState } from "react";
import CrearIngrediente from "@/components/admins/ingrediente/CrearIngrediente";
import router from "next/router";

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
  return (
    <div>
      <Link href={"/admin/ingrediente/crearIngrediente"}>
        <p>Crear nuevo ingrediente</p>
      </Link>
      <br />
      <h1>Listado de ingredientes</h1>
      <div>buscador</div>
      <CrearIngrediente ingredienteAModificar={null} />
      <div className="mx-2">
        {ingredientes.map((ingrediente) => (
          <IngredienteCard key={ingrediente.id} ingrediente={ingrediente} />
        ))}
      </div>
    </div>
  );
}
