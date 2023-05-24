import { getAllEstablecimientos } from "@/api/establecimiento";
import Buscador from "@/components/admins/ui/Buscador";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Establecimiento } from "@/types/Establecimiento";
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
  const { setEstablecimientoGlobal } = useContext(EstablecimientoContext);
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  return (
    <div className="flex flex-col gap-4">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">Todos mis establecimiento</h1>
        <select className="rounded-full border-[1px] border-primaryOrange mr-2 outline-none"></select>
        <Buscador />
      </CabeceraPagina>
      <div>
        {establecimientos.map((establecimiento) => (
          <div
            key={establecimiento.id}
            onClick={() => {
              console.log(establecimientoGlobal);
              setEstablecimientoGlobal(establecimiento);
            }}
          >
            {establecimiento.nombre}
          </div>
        ))}
      </div>
    </div>
  );
}
