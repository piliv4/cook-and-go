import Buscador from "@/components/admins/ui/Buscador";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import supabase from "@/server/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import { getCategoriaTitulo } from "@/api/categoria";
import { getPlatosByCategoria } from "@/api/articulo";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let titulo = await getCategoriaTitulo(id as string);
  let platos = await getPlatosByCategoria(id as string);
  return {
    props: {
      platos: platos as Plato[],
      titulo: titulo && titulo[0].nombre,
    },
  };
};

const DetallesCategoria = ({
  platos,
  titulo,
}: {
  platos: Plato[];
  titulo: String;
}) => {
  console.log(platos);
  return (
    <div className="flex flex-col gap-4 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">
          <Link className="hover:text-primaryOrange" href={"/admin/categoria"}>
            Todas mis categorias
          </Link>
          / Platos de {titulo}
        </h1>
        <Buscador />
      </CabeceraPagina>
      <DisplayerPlato platos={platos} />
    </div>
  );
};

export default DetallesCategoria;
