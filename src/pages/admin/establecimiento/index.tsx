import { getAllEstablecimientos } from "@/api/establecimiento";
import EstablecimientoCard from "@/components/admins/establecimiento/EstablecimientoCard";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Establecimiento } from "@/types/Establecimiento";
import router from "next/router";

export async function getServerSideProps() {
  let establecimientos = await getAllEstablecimientos();
  return {
    props: {
      establecimientos: establecimientos,
    },
  };
}

export default function EstablecimientoPage({
  establecimientos,
}: {
  establecimientos: Establecimiento[];
}) {
  return (
    <UsuarioAutorizado>
      <div className="flex flex-col gap-4">
        <CabeceraPagina>
          <h1 className="text-2xl font-black ">Todos mis establecimiento</h1>
          <div className="flex col-span-2 justify-end">
            <button
              className="self-end rounded-full border h-full px-11 font-black bg-primaryOrange text-white hover:scale-105 transition duration-100 "
              onClick={() =>
                router.push("/admin/establecimiento/crearEstablecimiento")
              }
            >
              Crear establecimiento
            </button>
          </div>
        </CabeceraPagina>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 sm:gap-3 ">
          {establecimientos.map((establecimiento) => (
            <EstablecimientoCard
              establecimiento={establecimiento}
              key={establecimiento.id}
            />
          ))}
        </div>
      </div>
    </UsuarioAutorizado>
  );
}
