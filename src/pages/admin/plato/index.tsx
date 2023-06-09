import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import { getAllPlatos, getPlatosByCategoria } from "@/api/plato";
import { Categoria } from "@/types/Categoria";
import { getAllCategorias } from "@/api/categoria";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";

export async function getStaticProps() {
  let categorias = await getAllCategorias();
  let platos = await getAllPlatos();
  return {
    props: {
      categorias: categorias,
      platos: platos as Plato[],
    },
  };
}

export default function PlatoPage({
  platos,
  categorias,
}: {
  platos: Plato[];
  categorias: Categoria[];
}) {
  const router = useRouter();
  const [platosFiltrados, setPlatosFiltrados] = useState(platos);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("-1");

  useEffect(() => {
    async function fetchPlatosFiltrados() {
      if (categoriaSeleccionada !== "-1") {
        try {
          // Realiza la llamada a la base de datos para obtener los platos filtrados por la categoría seleccionada
          const platosFiltradosAux = await getPlatosByCategoria(
            categoriaSeleccionada
          );
          setPlatosFiltrados(platosFiltradosAux);
        } catch (error) {
          console.error(error);
        }
      } else {
        setPlatosFiltrados(platos);
      }
    }

    fetchPlatosFiltrados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaSeleccionada]);

  useEffect(() => {
    async function fetchData() {
      // Realiza la llamada a getServerSideProps para obtener los datos actualizados
      const platos = (await getAllPlatos()) as Plato[];

      // Actualiza los platos filtrados con los datos actualizados
      setPlatosFiltrados(platos);
    }

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchData();
    }
  }, [router]);

  return (
    <UsuarioAutorizado>
      <div className="flex flex-col gap-4">
        <CabeceraPagina>
          <h1 className="text-2xl font-black ">Todos mis platos</h1>
          <select
            className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value={"-1"}>Todas mis categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <Buscador />
        </CabeceraPagina>
        <DisplayerPlato platos={platosFiltrados} />
      </div>
    </UsuarioAutorizado>
  );
}
