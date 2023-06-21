import {
  editarEstablecimiento,
  getEstablecimientoById,
} from "@/api/establecimiento";
import EstablecimientoFormulario from "@/components/admins/establecimiento/EstablecimientoFormulario";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Establecimiento } from "@/types/Establecimiento";
import { GetServerSideProps } from "next";
import router from "next/router";

export default function EditarEstablecimiento({
  establecimiento,
}: {
  establecimiento: Establecimiento;
}) {
  async function editar(establecimiento: Establecimiento) {
    try {
      await editarEstablecimiento(establecimiento);
    } catch (error) {
      console.log("error");
    }
    router.push("/admin/establecimiento");
  }

  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <EstablecimientoFormulario
          crearEditar={editar}
          establecimientoProp={establecimiento}
        />
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let establecimiento = await getEstablecimientoById(id as string);
  return {
    props: {
      establecimiento: establecimiento as Establecimiento,
    },
  };
};
