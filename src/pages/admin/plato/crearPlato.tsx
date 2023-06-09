import { getAllCategoriasPlatos } from "@/api/categoria";
import PlatoFormulario from "@/components/admins/plato/PlatoFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Categoria } from "@/types/Categoria";

export async function getStaticProps() {
  let categorias = await getAllCategoriasPlatos();
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
    <UsuarioAutorizado>
      <PlatoFormulario platoEditar={DEFAULT_PLATO} categorias={categorias} />
    </UsuarioAutorizado>
  );
}
