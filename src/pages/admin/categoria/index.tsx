import Buscador from "@/components/admins/ui/Buscador";
import CategoriaCard from "@/components/admins/categoria/CategoriaCard";
import CrearCategoriaCard from "@/components/admins/categoria/CrearCategoriaCard";
import supabase from "@/server/client";
import { Categoria } from "@/types/types";

export async function getServerSideProps() {
  let { data } = await supabase.from("Categoria").select("*").order("nombre");
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
  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">Todas mis categorias</h1>
        <Buscador />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
        {categorias.map((categoria) => (
          <CategoriaCard categoria={categoria} key={categoria.id} />
        ))}
        <CrearCategoriaCard />
      </div>
    </div>
  );
}
