import { getAllCategorias } from "@/api/categoria";
import { getPlatoById } from "@/api/plato";
import PlatoFormulario from "@/components/admins/plato/PlatoFormulario";
import { Categoria } from "@/types/Categoria";
import { Plato } from "@/types/Plato";
import { GetServerSideProps } from "next";

export default function CrearMenu({
  plato,
  categorias,
}: {
  plato: Plato;
  categorias: Categoria[];
}) {
  return <PlatoFormulario categorias={categorias} platoEditar={plato} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let plato = await getPlatoById(id as string);
  let categorias = await getAllCategorias();
  return {
    props: {
      plato: plato as Plato,
      categorias: categorias as Categoria[],
    },
  };
};
