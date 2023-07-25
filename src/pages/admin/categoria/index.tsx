import Buscador from "@/components/admins/ui/Buscador";
import CategoriaCard from "@/components/admins/categoria/CategoriaCard";
import CrearCategoriaCard from "@/components/admins/categoria/CrearCategoriaCard";
import { Categoria } from "@/types/Categoria";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllCategoriasByEstablecimiento } from "@/api/categoria";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import Loading from "@/components/layout/loadingGif";

export default function CategoriaHomePage() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [categorias, setCategorias] = useState<Categoria[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchIngredientes = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasByEstablecimiento(
          establecimientoGlobal.id
        );
      }
      setCategorias(categoriasAux);
    };

    if (router.asPath === router.route) {
      fetchIngredientes();
    }
  }, [establecimientoGlobal, router]);
  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <div className="flex flex-col gap-2 sm:gap-4">
            <CabeceraPagina>
              <h1 className=" text-xl sm:text-2xl font-black col-span-2">
                Todas mis categorias
              </h1>
              <Buscador />
            </CabeceraPagina>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
              {categorias ? (
                <>
                  <CrearCategoriaCard />
                  {categorias.map((categoria) => (
                    <CategoriaCard categoria={categoria} key={categoria.id} />
                  ))}
                </>
              ) : (
                <div className="col-span-full flex justify-center pt-6">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}
