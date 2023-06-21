import { getEmpleadoById, modificarEmpleado } from "@/api/empleado";
import EmpleadoFormulario from "@/components/admins/empleados/EmpleadoFormulario";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Empleado } from "@/types/Empleado";
import { GetServerSideProps } from "next";
import router from "next/router";

export default function EditarEmpleado({ empleado }: { empleado: Empleado }) {
  async function editar(empleado: Empleado) {
    try {
      await modificarEmpleado(empleado);
    } catch (error) {
      console.log("error");
    }
    router.push("/admin/empleado");
  }

  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <EmpleadoFormulario crearEditar={editar} empleadoProp={empleado} />;
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let empleado = await getEmpleadoById(id as string);
  return {
    props: {
      empleado: empleado as Empleado,
    },
  };
};
