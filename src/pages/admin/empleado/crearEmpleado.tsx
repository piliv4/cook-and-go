import { crearEmpleado } from "@/api/empleado";
import EmpleadoFormulario from "@/components/admins/empleados/EmpleadoFormulario";
import { Empleado } from "@/types/Empleado";
import router from "next/router";

export default function CrearEstablecimiento() {
  async function crear(empleado: Empleado) {
    try {
      await crearEmpleado(empleado);
    } catch (error) {
      console.log("Error al crear un empleado");
    }
    router.push("/admin/empleado");
  }

  return <EmpleadoFormulario empleadoProp={null} crearEditar={crear} />;
}
