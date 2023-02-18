import supabase from "@/server/client";
import Link from "next/link";
import { Plato } from "@/types/types";

export async function getServerSideProps() {
  let { data } = await supabase.from("Articulo").select("*");
  return {
    props: {
      platos: data,
    },
  };
}

export default function PlatoPage({ platos }: { platos: Plato[] }) {
  return (
    <div>
      <h1>Mis platos</h1>
      <Link href="/admin/plato/crearPlato">Crear nuevo plato</Link>
      <div className="grid grid-cols-4">
        <div className="row-span-full">Todos mis platos</div>
        {platos.map((plato) => (
          <div key={plato.id}>
            <h1>{plato.nombre}</h1>
            <p>{plato.descripcion}</p>
            <p>{plato.precio}</p>
            <Link href={"/admin/plato/" + plato.id}>Ver en detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
