import Link from "next/link";
import { useRouter } from "next/router";

const AdminHeader = () => {
  const router = useRouter();
  let seccion = router.pathname.split("/")[2];
  return (
    <div className="flex justify-center bg-background">
      <div className="bg-primaryGreen py-2 px-8 flex flex-row mb-4 gap-x-3 rounded-b-full w-[95%]  text-white">
        <h1 className="font-bold text-lg px-2 text-white">
          <Link href={"/"}>Cook&Go</Link>
        </h1>
        <div className="mt-[3px] gap-x-3 flex flex-row">
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
            href={"/admin/ingrediente"}
            className={`px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
              seccion == "ingrediente" && "underline "
            }`}
          >
            Mis ingredientes
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
