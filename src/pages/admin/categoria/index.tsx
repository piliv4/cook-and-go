import Buscador from "@/components/admins/Buscador";
import CategoriaCard from "@/components/admins/categoria/CategoriaCard";
import CrearCategoriaCard from "@/components/admins/categoria/CrearCategoriaCard";
import Header from "@/components/layout/AdminHeader";
import supabase from "@/server/client";
import { Categoria } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps() {
  let { data } = await supabase.from("Categoria").select("*");
  return {
    props: {
      categorias: data,
    },
  };
}

export default function CategoriaHomePage({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const router = useRouter();
  return (
    <div className="bg-background">
      <div className="mx-[36px]  min-h-[calc(100vh-60px)] flex flex-col gap-4">
        <div className="grid grid-cols-[80%_20%] w-full">
          <h1 className="text-2xl font-black ">Mis categorias</h1>
          <Buscador />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
          {categorias.map((categoria) => (
            <CategoriaCard categoria={categoria} key={categoria.id} />
          ))}
          <CrearCategoriaCard />
        </div>
      </div>
    </div>
  );
}
