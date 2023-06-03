import { getAllCategorias } from "@/api/categoria";
import { getAllIngredientes } from "@/api/ingrediente";
import PlatoFormulario from "@/components/admins/plato/PlatoFormulario";
import { Categoria } from "@/types/Categoria";
import { Ingrediente } from "@/types/Ingrediente";
import { Plato } from "@/types/Plato";

export async function getStaticProps() {
  let categorias = await getAllCategorias();
  return {
    props: {
      categorias: categorias as Categoria[],
    },
  };
}

export default function CrearPlato({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const DEFAULT_PLATO = {
    id: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    imagenURL: "",
    ingredientes: [],
  };
  return (
    <PlatoFormulario platoEditar={DEFAULT_PLATO} categorias={categorias} />
  );
}
