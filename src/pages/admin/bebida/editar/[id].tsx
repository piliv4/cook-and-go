import { getAllCategoriasBebidas } from "@/api/categoria";
import { getBebidaById } from "@/api/bebida";
import BebidaFormulario from "@/components/admins/bebida/BebidaFormulario";
import { Categoria } from "@/types/Categoria";
import { Bebida } from "@/types/Bebida";
import { GetServerSideProps } from "next";

export default function CrearMenu({
  bebida,
  categorias,
}: {
  bebida: Bebida;
  categorias: Categoria[];
}) {
  return <BebidaFormulario categorias={categorias} bebidaEditar={bebida} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let bebida = await getBebidaById(id as string);
  let categorias = await getAllCategoriasBebidas();
  return {
    props: {
      bebida: bebida as Bebida,
      categorias: categorias as Categoria[],
    },
  };
};
