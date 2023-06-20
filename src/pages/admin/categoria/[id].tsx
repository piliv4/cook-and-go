import Buscador from "@/components/admins/ui/Buscador";
import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { getCategoriaById } from "@/api/categoria";
import { getPlatosByCategoria } from "@/api/plato";
import { Categoria } from "@/types/Categoria";
import { getBebidaByCategoria } from "@/api/bebida";
import DisplayerBebida from "@/components/admins/bebida/DisplayerBebida";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let categoria = await getCategoriaById(id as string);
  let res;
  (categoria as Categoria).esDeBebidas
    ? (res = await getBebidaByCategoria(id as string))
    : (res = await getPlatosByCategoria(id as string));
  return {
    props: {
      detalles: res as any[],
      categoria: categoria,
    },
  };
};

const DetallesCategoria = ({
  detalles,
  categoria,
}: {
  detalles: any[];
  categoria: Categoria;
}) => {
  return (
    <UsuarioAutorizado>
      <VerificarEstablecimiento>
        <div className="flex flex-col gap-4 ">
          <CabeceraPagina>
            <h1 className="text-2xl font-black ">
              <Link
                className="hover:text-primaryOrange"
                href={"/admin/categoria"}
              >
                Todas mis categorias
              </Link>
              / {categoria.nombre}
            </h1>
            <Buscador />
          </CabeceraPagina>
          {categoria.esDeBebidas ? (
            <DisplayerBebida bebidas={detalles} />
          ) : (
            <DisplayerPlato platos={detalles} />
          )}
        </div>
      </VerificarEstablecimiento>
    </UsuarioAutorizado>
  );
};

export default DetallesCategoria;
