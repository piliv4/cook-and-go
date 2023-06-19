import Buscador from "@/components/admins/ui/Buscador";
import CategoriaCard from "@/components/admins/categoria/CategoriaCard";
import CrearCategoriaCard from "@/components/admins/categoria/CrearCategoriaCard";
import { Categoria } from "@/types/Categoria";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllCategoriasByEstablecimiento } from "@/api/categoria";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";

export default function CategoriaHomePage() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
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
      <div className="flex flex-col gap-4 ">
        <div className="grid grid-cols-[80%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
          <h1 className="text-2xl font-black ">Todas mis categorias</h1>
          <Buscador />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
          <CrearCategoriaCard />
          {categorias.map((categoria) => (
            <CategoriaCard categoria={categoria} key={categoria.id} />
          ))}
        </div>
      </div>
    </UsuarioAutorizado>
  );
}
