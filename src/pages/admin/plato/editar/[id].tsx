import { getAllCategoriasPlatos } from "@/api/categoria";
import { getPlatoById } from "@/api/plato";
import PlatoFormulario from "@/components/admins/plato/PlatoFormulario";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Categoria } from "@/types/Categoria";
import { Plato } from "@/types/Plato";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";

export default function EditarPlato({ plato }: { plato: Plato }) {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasPlatos(establecimientoGlobal.id);
      }
      setCategorias(categoriasAux);
    };

    fetchCategorias();
  }, [establecimientoGlobal]);
  return (
    <UsuarioAutorizado>
      <VerificarEstablecimiento>
        <PlatoFormulario categorias={categorias} platoEditar={plato} />;
      </VerificarEstablecimiento>
    </UsuarioAutorizado>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let plato = await getPlatoById(id as string);
  return {
    props: {
      plato: plato as Plato,
    },
  };
};
