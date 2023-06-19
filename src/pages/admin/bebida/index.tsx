import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import {
  getAllBebidasByEstablecimientoId,
  getBebidaByCategoria,
} from "@/api/bebida";
import { Categoria } from "@/types/Categoria";
import { getAllCategoriasBebidas } from "@/api/categoria";
import { useContext, useEffect, useState } from "react";
import BebidaCard from "@/components/admins/bebida/BebidaCard";
import { Bebida } from "@/types/Bebida";
import CrearBebidaCard from "@/components/admins/bebida/CrearBebidaCard";
import { useRouter } from "next/router";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";

export default function BebidaPage() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  const router = useRouter();
  const [bebidasFiltradas, setBebidasFiltradas] = useState<Bebida[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("-1");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasBebidas(establecimientoGlobal.id);
      }
      setCategorias(categoriasAux);
    };

    if (router.asPath === router.route) {
      fetchIngredientes();
    }
  }, [establecimientoGlobal, router]);

  useEffect(() => {
    async function fetchBebidasFiltradas() {
      let bebidasFiltradasAux = [];
      if (categoriaSeleccionada !== "-1") {
        try {
          bebidasFiltradasAux = await getBebidaByCategoria(
            categoriaSeleccionada
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        bebidasFiltradasAux = await getAllBebidasByEstablecimientoId(
          establecimientoGlobal.id
        );
      }
      setBebidasFiltradas(bebidasFiltradasAux);
    }

    fetchBebidasFiltradas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaSeleccionada, establecimientoGlobal]);

  useEffect(() => {
    async function fetchData() {
      // Realiza la llamada a getServerSideProps para obtener los datos actualizados
      let bebidas = [] as Bebida[];
      if (establecimientoGlobal.id != undefined) {
        bebidas = (await getAllBebidasByEstablecimientoId(
          establecimientoGlobal.id
        )) as Bebida[];
      }

      // Actualiza los bebidas filtrados con los datos actualizados
      setBebidasFiltradas(bebidas);
    }

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchData();
    }
  }, [establecimientoGlobal.id, router]);
  return (
    <UsuarioAutorizado>
      <div className="flex flex-col gap-4">
        <CabeceraPagina>
          <h1 className="text-2xl font-black ">Todos mis bebidas</h1>
          <select
            className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"
            onChange={(e) => {
              setCategoriaSeleccionada(e.target.value);
            }}
          >
            <option value="-1">Todas mis bebidas</option>
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
    </UsuarioAutorizado>
  );
}
