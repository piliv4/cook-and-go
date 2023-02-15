import Link from "next/link";

export default function administrador() {
  return (
    <div className=" h-screen flex flex-col">
      <div>
        <h1 className="text-center text-lg font-bold py-3">
          Bienvenido a la página de administrador, seleccione una funcionalidad:
        </h1>
      </div>
      <div className="flex  flex-grow ">
        <div className="grid w-full grid-cols-[40%_60%]">
          <ul>
            <li>
              <Link href="/admin/ingrediente">
                <p> Mis ingredientes</p>
              </Link>
            </li>
            <li>
              <Link href="/admin/plato">
                <p> Mis platos</p>
              </Link>
            </li>
            <li>
              <Link href="/admin/menu">
                <p> Mis menús</p>
              </Link>
            </li>
            <li>
              <Link href="/admin/categoria">
                <p> Mis categorías</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
