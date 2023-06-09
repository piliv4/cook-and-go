import { getAllCategoriasBebidas } from "@/api/categoria";
import BebidaFormulario from "@/components/admins/bebida/BebidaFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Categoria } from "@/types/Categoria";

export async function getStaticProps() {
  let categorias = await getAllCategoriasBebidas();
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
    <UsuarioAutorizado>
      <BebidaFormulario bebidaEditar={DEFAULT_BEBIDA} categorias={categorias} />
    </UsuarioAutorizado>
  );
}
