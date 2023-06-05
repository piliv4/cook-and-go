import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import { getAllBebidas, getBebidaByCategoria } from "@/api/bebida";
import { Categoria } from "@/types/Categoria";
import { getAllCategoriasBebidas } from "@/api/categoria";
import { useEffect, useState } from "react";
import BebidaCard from "@/components/admins/bebida/BebidaCard";
import { Bebida } from "@/types/Bebida";
import CrearBebidaCard from "@/components/admins/bebida/CrearBebidaCard";
import { useRouter } from "next/router";

export async function getStaticProps() {
  let categorias = await getAllCategoriasBebidas();
  let bebidas = await getAllBebidas();
  return {
    props: {
      categorias: categorias,
      bebidas: bebidas as Bebida[],
    },
  };
}

export default function BebidaPage({
  bebidas,
  categorias,
}: {
  bebidas: Plato[];
  categorias: Categoria[];
}) {
  const router = useRouter();
  const [bebidasFiltradas, setBebidasFiltradas] = useState<Bebida[]>(bebidas);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("-1");

  useEffect(() => {
    async function fetchBebidasFiltradas() {
      if (categoriaSeleccionada !== "-1") {
        try {
          const bebidasFiltradasAux = await getBebidaByCategoria(
            categoriaSeleccionada
          );
          setBebidasFiltradas(bebidasFiltradasAux);
        } catch (error) {
          console.error(error);
        }
      } else {
        setBebidasFiltradas(bebidas);
      }
    }

    fetchBebidasFiltradas();
  }, [categoriaSeleccionada]);

  useEffect(() => {
    async function fetchData() {
      // Realiza la llamada a getServerSideProps para obtener los datos actualizados
      const bebidas = (await getAllBebidas()) as Plato[];

      // Actualiza los bebidas filtrados con los datos actualizados
      setBebidasFiltradas(bebidas);
    }

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchData();
    }
  }, [router]);
  return (
    <div className="flex flex-col gap-4">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">Todos mis bebidas</h1>
        <select
          className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"
          onChange={(e) => {
            const bebidasFiltradasAux = bebidas.filter(
              // @ts-ignore
              (bebida) => bebida.categoria_id === e.target.value
            );
            setBebidasFiltradas(bebidasFiltradasAux);
          }}
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <Buscador />
      </CabeceraPagina>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
        <CrearBebidaCard />
        {bebidasFiltradas.map((bebida) => (
          <BebidaCard bebida={bebida} key={bebida.id} />
        ))}
      </div>
    </div>
  );
}
