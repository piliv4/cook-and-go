import Link from "next/link";
import supabase from "../../../server/client";

type Ingrediente = {
  id: number;
  nombre: string;
  descripcion: string;
  precioSuplemento: number;
};

export async function getServerSideProps() {
  let { data } = await supabase.from("Ingrediente").select("*");
  return {
    props: {
      ingredientes: data,
    },
  };
}

export default function administrador({
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
      <ul>
        {ingredientes.map((ingrediente) => (
          <li key={ingrediente.id}>
            {ingrediente.nombre}, {ingrediente.descripcion},{" "}
            {ingrediente.precioSuplemento}
          </li>
        ))}
      </ul>
    </div>
  );
}
