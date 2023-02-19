import supabase from "@/server/client";
import Link from "next/link";
import { Plato } from "@/types/types";
import PlatoDetalle from "@/components/admins/plato/PlatoCard";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  let { data } = await supabase.from("Articulo").select("*");
  return {
    props: {
      platos: data,
    },
  };
}

export default function PlatoPage({ platos }: { platos: Plato[] }) {
  const router = useRouter();
  const reload = () => {
    router.replace(router.asPath);
  };
  return (
    <div className="px-2 ">
      <div>
        <h1 className="text-lg text-center font-medium">Mis platos</h1>
        <Link
          href="/admin/plato/crearPlato"
          className="py-1 px-3 rounded-md bg-blue-400"
        >
          Crear nuevo plato
        </Link>
      </div>
      <div className="mt-4">
        <h1 className="text-lg text-center font-medium">Todos mis platos</h1>
        <div className="grid grid-cols-4 gap-3 mt-2">
          {platos.map((plato) => (
            <PlatoDetalle plato={plato} recargar={reload} key={plato.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
