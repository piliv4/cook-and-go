import { getAllCategorias } from "@/api/categoria";
import BebidaFormulario from "@/components/admins/bebida/BebidaFormulario";
import PlatoFormulario from "@/components/admins/plato/PlatoFormulario";
import { Categoria } from "@/types/Categoria";

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
  const DEFAULT_BEBIDA = {
    id: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    imagenURL: "",
  };
  return (
    <BebidaFormulario bebidaEditar={DEFAULT_BEBIDA} categorias={categorias} />
  );
}
