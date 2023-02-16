import CategoriaCard from "@/components/admins/categoria/CategoriaCard";
import supabase from "@/server/client";
import { Categoria } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const reload = () => {
    router.replace(router.asPath);
  };
  return (
    <div className="px-2">
      <h1 className="text-lg text-center font-medium">Mis categorias</h1>
      <Link
        href="/admin/categoria/crearCategoria"
        className="py-1 px-3 rounded-md bg-blue-400"
      >
        Crear nueva categoria
      </Link>
      <div className="grid grid-cols-4 gap-3 ">
        <div className="col-span-full text-center pb-2">
          Todas mis categorias
        </div>
        {categorias.map((categoria) => (
          <CategoriaCard
            categoria={categoria}
            recargar={reload}
            key={categoria.id}
          />
        ))}
      </div>
    </div>
  );
}
