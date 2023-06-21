import { getAllCategoriasBebidas } from "@/api/categoria";
import { getBebidaById } from "@/api/bebida";
import BebidaFormulario from "@/components/admins/bebida/BebidaFormulario";
import { Categoria } from "@/types/Categoria";
import { Bebida } from "@/types/Bebida";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";

export default function CrearMenu({ bebida }: { bebida: Bebida }) {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasBebidas(establecimientoGlobal.id);
      }
      setCategorias(categoriasAux);
    };

    fetchCategorias();
  }, [establecimientoGlobal]);

  return (
    <AdministradorAutorizado>
      <VerificarEstablecimiento>
        <BebidaFormulario categorias={categorias} bebidaEditar={bebida} />;
      </VerificarEstablecimiento>
    </AdministradorAutorizado>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let bebida = await getBebidaById(id as string);
  return {
    props: {
      bebida: bebida as Bebida,
    },
  };
};
