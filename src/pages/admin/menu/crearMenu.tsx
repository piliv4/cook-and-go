import SeccionMenu from "@/components/admins/menu/SeccionMenu";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";

export default function CrearMenu() {
  const menuCategorias = ["Entrantes", "Primeros", "Segundos", "Postres"];
  return (
    <div className="px-48 ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black col-span-3 text-center uppercase ">
          Crear un nuevo menú
        </h1>
      </CabeceraPagina>
      <div>
        <h1>Información general</h1>
      </div>
      <div className=" flex flex-col">
        {menuCategorias.map((categoria) => (
          <SeccionMenu titulo={categoria} key={categoria} />
        ))}
      </div>
      <div>
        <button>Guardar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
}
