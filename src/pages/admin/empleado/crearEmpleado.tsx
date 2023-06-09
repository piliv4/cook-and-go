import { crearEmpleado } from "@/api/empleado";
import EmpleadoFormulario from "@/components/admins/empleados/EmpleadoFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { Empleado } from "@/types/Empleado";
import router from "next/router";

export default function CrearEmpleado() {
  async function crear(empleado: Empleado) {
    try {
      await crearEmpleado(empleado);
    } catch (error) {
      console.log("Error al crear un empleado");
    }
    router.push("/admin/empleado");
  }

  return (
    <UsuarioAutorizado>
      <EmpleadoFormulario empleadoProp={null} crearEditar={crear} />;
    </UsuarioAutorizado>
  );
}
