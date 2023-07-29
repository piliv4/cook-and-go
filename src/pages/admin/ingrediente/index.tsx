import { Ingrediente } from "@/types/Ingrediente";
import {
  getAllIngredientes,
  getAllIngredientesByEstablecimiento,
  getIngredientesPaginados,
} from "@/api/ingrediente";
import CrearIngrediente from "@/components/admins/ingrediente/CrearIngrediente";
import Buscador from "@/components/admins/ui/Buscador";
import IngredienteTable from "@/components/admins/ingrediente/IngredienteTable";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import supabase from "@/server/client";

export default function IngredientesPagina() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [allIngredientesLength, setAllIngredientesLength] = useState(0);
  const [ingredientesMostrar, setIngredientesMostrar] = useState<Ingrediente[]>(
    []
  );

  const itemsPerPage = 11;

  useEffect(() => {
    const fetchAllIngredientes = async () => {
      let ingredientes;
      if (establecimientoGlobal.id != undefined) {
        ingredientes = await getAllIngredientesByEstablecimiento(
          establecimientoGlobal.id
        );
      }

      setAllIngredientesLength(ingredientes ? ingredientes.length : 0);
    };

    fetchAllIngredientes();
  }, [establecimientoGlobal, ingredientesMostrar]);

  useEffect(() => {
    const fetchIngredientes = async () => {
      const startIndex = index;
      const endIndex = index + itemsPerPage;
      let ingredientesPaginados = [];
      // Aquí debes realizar la llamada a la base de datos para obtener los ingredientes
      // con los parámetros de offset y limit
      if (establecimientoGlobal.id != undefined) {
        ingredientesPaginados = await getIngredientesPaginados(
          startIndex,
          endIndex,
          establecimientoGlobal.id
        );
      }

      setIngredientesMostrar(ingredientesPaginados);
    };

    fetchIngredientes();
  }, [establecimientoGlobal, index]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime_comandasArticulo")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Ingrediente",
          filter: "id=eq.6c2986e8-9131-4cbc-a7a7-cb1efbdcd96e",
        },
        async (payload) => {
          setIngredientesMostrar((prevIngredientes) =>
            prevIngredientes.map((ingrediente) =>
              ingrediente.id === payload.new.id
                ? (payload.new as Ingrediente)
                : ingrediente
            )
          );
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Realiza la llamada a getAllIngredientes para obtener los ingredientes actualizados
    const fetchIngredientes = async () => {
      let ingredientes = [];
      if (establecimientoGlobal.id != undefined)
        ingredientes = await getIngredientesPaginados(
          index,
          index + itemsPerPage,
          establecimientoGlobal.id
        );
      setIngredientesMostrar(ingredientes);
    };

    // Verifica si el componente se carga directamente o se realiza un reemplazo de la ruta
    if (router.asPath === router.route) {
      fetchIngredientes();
    }
  }, [establecimientoGlobal, index, router]);

  const AnteriorClick = () => {
    const nextIndex = Math.max(index - itemsPerPage, 0);
    setIndex(nextIndex);
  };

  const SiguienteClick = () => {
    const nextIndex = index + itemsPerPage;
    setIndex(nextIndex);
  };

  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <div className="flex flex-col gap-4">
            <div className=" flex flex-col sm:flex-row w-full pb-3 border-primaryGreen border-double border-b-4">
              <div className=" text-xl sm:text-2xl font-black flex items-end flex-1">
                <h1>Todos mis Ingredientes</h1>
                <abbr title="Con los ingredientes podrás crear platos">
                  <AiOutlineInfoCircle className="ml-1 " size={24} />
                </abbr>
              </div>
              <Link
                className="bg-secondaryGreen  py-1 px-2 rounded-full justify-center align-middle items-center text-white uppercase hover:bg-secondaryOrange font-bold"
                href={"/listaDeLaCompra/" + establecimientoGlobal.id}
              >
                Generar lista de la compra
              </Link>
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
              {index + 11 < allIngredientesLength && (
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
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}
