import SeccionMenu from "@/components/admins/menu/SeccionMenu";
import CabeceraPagina from "@/components/admins/ui/CabeceraPagina";

export default function CrearMenu() {
  const menuCategorias = ["Entrantes", "Primeros", "Segundos", "Postres"];
  return (
    <div className=" ">
      <CabeceraPagina>
        <h1 className="text-2xl font-black ">Crear un nuevo menú</h1>
      </CabeceraPagina>
      <div className=" grid grid-cols-2 gap-x-8 ">
        {menuCategorias.map((categoria) => (
          <SeccionMenu titulo={categoria} key={categoria} />
        ))}
      </div>
    </div>
  );
}
