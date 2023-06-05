import { Ingrediente } from "@/types/Ingrediente";
import {
  getAllIngredientes,
  getIngredientesPaginados,
} from "@/api/ingrediente";
import CrearIngrediente from "@/components/admins/ingrediente/CrearIngrediente";
import Buscador from "@/components/admins/ui/Buscador";
import IngredienteTable from "@/components/admins/ingrediente/IngredienteTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const ingredientes = await getAllIngredientes();
  return {
    props: {
      ingredientes: ingredientes,
    },
  };
}

export default function IngredientesPagina({
  ingredientes,
}: {
  ingredientes: Ingrediente[];
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [ingredientesMostrar, setIngredientesMostrar] = useState<Ingrediente[]>(
    []
  );

  const itemsPerPage = 11;

  useEffect(() => {
    const fetchIngredientes = async () => {
      const startIndex = index;
      const endIndex = index + itemsPerPage;

      // Aquí debes realizar la llamada a la base de datos para obtener los ingredientes
      // con los parámetros de offset y limit
      const ingredientesPaginados = await getIngredientesPaginados(
        startIndex,
        endIndex
      );

      setIngredientesMostrar(ingredientesPaginados);
    };

    fetchIngredientes();
  }, [index]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // Realiza la llamada a getServerSideProps para obtener los datos actualizados
  //     const ingredientes = (await getIngredientesPaginados(
  //       index,
  //       index + itemsPerPage
  //     )) as Ingrediente[];

  //     // Actualiza los bebidas filtrados con los datos actualizados
  //     setIngredientesMostrar(ingredientes);
  //   }

  //   // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
  //   if (router.asPath === router.route) {
  //     fetchData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router]);

  const AnteriorClick = () => {
    const nextIndex = Math.max(index - itemsPerPage, 0);
    setIndex(nextIndex);
  };

  const SiguienteClick = () => {
    const nextIndex = index + itemsPerPage;
    setIndex(nextIndex);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">Mis ingredientes</h1>
        <Buscador />
      </div>
      <CrearIngrediente />
      <IngredienteTable ingrediente={ingredientesMostrar} />
      <div className="text-white flex flex-row">
        {index > 0 && (
          <div className="w-full flex ">
            <button
              className="rounded-full bg-primaryOrange font-black px-4 py-1 hover:bg-secondaryOrange"
              onClick={() => AnteriorClick()}
            >
              Anterior
            </button>
          </div>
        )}
        {index + 11 < ingredientes.length && (
          <div className="w-full flex justify-end">
            <button
              className="rounded-full bg-primaryOrange font-black px-4 py-1 hover:bg-secondaryOrange"
              onClick={() => SiguienteClick()}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
