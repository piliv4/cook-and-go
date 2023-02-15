import Link from "next/link";
import supabase from "../../server/client";

export default function administrador() {
  return (
    <div className="h-screen ">
      <div>
        <h1 className="text-center text-lg">
          Bienvenido a la página de administrador, seleccione una funcionalidad:
        </h1>
      </div>
      <div className=" grid grid-cols-[35%_65%] ">
        <ul>
          <li>
            <Link href="/admin/ingrediente">
              <p> Mis ingredientes</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/ingrediente">
              <p> Mis platos</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/ingrediente">
              <p> Mis menús</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/ingrediente">
              <p> Mis categorías</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
