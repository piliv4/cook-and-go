import DisplayerPlato from "@/components/admins/plato/DisplayerPlato";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { Plato } from "@/types/Plato";
import {
  getAllPlatosByEstablecimiento,
  getPlatosByCategoria,
} from "@/api/plato";
import { Categoria } from "@/types/Categoria";
import { getAllCategoriasPlatos } from "@/api/categoria";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import Loading from "@/components/layout/loadingGif";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function PlatoPage() {
  const router = useRouter();
  const [platosFiltrados, setPlatosFiltrados] = useState<Plato[]>();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("-1");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasPlatos(establecimientoGlobal.id);
      }
      setCategorias(categoriasAux);
    };
    fetchIngredientes();
  }, [establecimientoGlobal]);

  useEffect(() => {
    async function fetchPlatosFiltrados() {
      let platosFiltradosAux = [];
      if (categoriaSeleccionada !== "-1") {
        try {
          // Realiza la llamada a la base de datos para obtener los platos filtrados por la categoría seleccionada
          platosFiltradosAux = await getPlatosByCategoria(
            categoriaSeleccionada
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        if (establecimientoGlobal.id != undefined) {
          platosFiltradosAux = await getAllPlatosByEstablecimiento(
            establecimientoGlobal.id
          );
        }
      }
      setPlatosFiltrados(platosFiltradosAux);
    }

    fetchPlatosFiltrados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaSeleccionada]);

  useEffect(() => {
    async function fetchData() {
      let platosFiltradosAux = [] as Plato[];
      if (establecimientoGlobal.id != undefined) {
        platosFiltradosAux = (await getAllPlatosByEstablecimiento(
          establecimientoGlobal.id
        )) as Plato[];
      }
      setPlatosFiltrados(platosFiltradosAux);
    }

    if (router.asPath === router.route) {
      fetchData();
    }
  }, [establecimientoGlobal.id, router]);

  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <div className="flex flex-col gap-2 sm:gap-4">
            <CabeceraPagina>
              <div className=" text-xl sm:text-2xl font-black flex items-end">
                <h1>Todos mis platos</h1>
                <abbr title="Los platos son los productos principales que venderás en tu establecimiento">
                  <AiOutlineInfoCircle className="ml-1 " size={24} />
                </abbr>
              </div>
              <select
                className="rounded-full border-[1px] sm:my-0 my-2 border-primaryOrange mr-2 outline-none"
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
            <>
              {platosFiltrados ? (
                <DisplayerPlato platos={platosFiltrados} />
              ) : (
                <Loading />
              )}
            </>
          </div>
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}
