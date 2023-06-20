import { crearEmpleado } from "@/api/empleado";
import EmpleadoFormulario from "@/components/admins/empleados/EmpleadoFormulario";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Empleado } from "@/types/Empleado";
import router from "next/router";
import { useContext } from "react";

export default function CrearEmpleado() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  async function crear(empleado: Empleado) {
    try {
      await crearEmpleado(empleado, establecimientoGlobal.id);
    } catch (error) {
      console.log("Error al crear un empleado");
    }
    router.push("/admin/empleado");
  }

  return (
    <UsuarioAutorizado>
      <VerificarEstablecimiento>
        <EmpleadoFormulario empleadoProp={null} crearEditar={crear} />;
      </VerificarEstablecimiento>
    </UsuarioAutorizado>
  );
}
