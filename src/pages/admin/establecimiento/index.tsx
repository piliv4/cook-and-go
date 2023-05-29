import {
  eliminarEstablecimiento,
  getAllEstablecimientos,
} from "@/api/establecimiento";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Establecimiento } from "@/types/Establecimiento";
import router from "next/router";
import { useContext } from "react";

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
  async function borrarEstablecimiento(id: string) {
    try {
      await eliminarEstablecimiento(id);
    } catch (error) {
      console.log("Error al eliminar el establecimiento");
    }
    router.replace(router.asPath);
  }
  const { setEstablecimientoGlobal } = useContext(EstablecimientoContext);
  // const { establecimientoGlobal } = useContext(EstablecimientoContext);
  return (
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
      <div>
        {establecimientos.map((establecimiento) => (
          <div key={establecimiento.id}>
            <p
              onClick={() => {
                setEstablecimientoGlobal(establecimiento);
              }}
            >
              {establecimiento.nombre}
            </p>
            <p onClick={() => borrarEstablecimiento(establecimiento.id)}>
              borrar
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
