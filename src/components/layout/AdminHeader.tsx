import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { UsuarioContext } from "@/context/UsuarioContext";
import { Empleado } from "@/types/Empleado";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillPersonFill, BsFillTriangleFill } from "react-icons/bs";

export default function AdminHeader() {
  const router = useRouter();
  let seccion = router.pathname.split("/")[2];
  const [phoneMenu, setPhoneMenu] = useState(false);
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const { nombre: nombreEstablecimiento } = establecimientoGlobal;

  const { setUsuarioGlobal } = useContext(UsuarioContext);

  return (
    <div className="flex flex-row justify-center bg-background">
      <div
        className={`bg-primaryGreen py-2 px-8 flex flex-col mb-4 gap-x-3 w-full  text-white ${
          phoneMenu ? "rounded-b-2xl" : "rounded-b-full"
        }  `}
      >
        <div className="flex flex-row">
          <h1 className=" flex-1 sm:flex-none font-bold text-lg px-2 text-white">
            <div className="flex items-center gap-1">
              <AiOutlineMenu
                className="block sm:hidden -ml-2"
                onClick={() => setPhoneMenu(!phoneMenu)}
              />
              <p>Cook&Go</p>
            </div>
          </h1>

          {establecimientoGlobal.id != undefined ? (
            <div className=" flex-1 mt-[3px] gap-x-3 hidden  sm:flex">
              <Link
                href={"/admin/categoria"}
                className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px]  ${
                  seccion == "categoria" && " underline   "
                }`}
              >
                Mis categorias
              </Link>
              <Link
                href={"/admin/menu"}
                className={` px-2 pt-[1px] font-light text-sm  transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "menu" && " underline "
                }`}
              >
                Mis menús
              </Link>
              <Link
                href={"/admin/plato"}
                className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "plato" && "underline "
                }`}
              >
                Mis platos
              </Link>
              <Link
                href={"/admin/bebida"}
                className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "bebida" && "underline "
                }`}
              >
                Mis bebidas
              </Link>
              <Link
                href={"/admin/ingrediente"}
                className={`px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "ingrediente" && "underline "
                }`}
              >
                Mis ingredientes
              </Link>
              <Link
                href={"/admin/empleado"}
                className={`px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "empleado" && "underline "
                }`}
              >
                Mis empleados
              </Link>
            </div>
          ) : (
            <p className="w-full text-center">
              ¡Seleccione un establecimiento para empezar a gestionarlo!
            </p>
          )}

          <div className=" mt-[3px] flex flex-row w-fit  justify-end ">
            <Link
              className="pr-2 font-light w-full"
              href={"/admin/establecimiento/" + establecimientoGlobal.id}
            >
              {nombreEstablecimiento}
            </Link>
            <div className="relative group">
              <BsFillPersonFill className="fill-white " size={24} />
              <div className="absolute  hidden group-hover:flex flex-col -left-[152px] w-44 ">
                <div className="flex justify-end">
                  <BsFillTriangleFill className="mr-1 -mb-1 fill-secondaryGreen " />
                </div>
                <div className="w-full bg-secondaryGreen flex flex-col  rounded-md p-1">
                  <Link
                    href={"/admin/establecimiento"}
                    className="text-black pt-1 rounded-md hover:bg-terciaryIntermediate"
                  >
                    Mis establecimientos
                  </Link>
                  <button
                    className="text-black rounded-md hover:bg-background"
                    onClick={() => {
                      setUsuarioGlobal({} as Empleado);
                      router.push("/login");
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {phoneMenu && (
          <div className="block sm:hidden">
            <div className="flex flex-col">
              <Link
                href={"/admin/categoria"}
                className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px]  ${
                  seccion == "categoria" && " underline   "
                }`}
              >
                Mis categorias
              </Link>
              <Link
                href={"/admin/menu"}
                className={` px-2 pt-[1px] font-light text-sm  transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "menu" && " underline "
                }`}
              >
                Mis menús
              </Link>
              <Link
                href={"/admin/plato"}
                className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "plato" && "underline "
                }`}
              >
                Mis platos
              </Link>
              <Link
                href={"/admin/bebida"}
                className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "bebida" && "underline "
                }`}
              >
                Mis bebidas
              </Link>
              <Link
                href={"/admin/ingrediente"}
                className={`px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "ingrediente" && "underline "
                }`}
              >
                Mis ingredientes
              </Link>
              <Link
                href={"/admin/empleado"}
                className={`px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
                  seccion == "empleado" && "underline "
                }`}
              >
                Mis empleados
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
