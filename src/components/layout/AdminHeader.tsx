import Link from "next/link";

const AdminHeader = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-blue-600 py-2 px-8 flex flex-row mb-4 gap-x-3 rounded-b-full w-[95%] ">
        <h1 className="font-bold text-lg px-2 text-white">
          <Link href={"/"}>Cook&Go</Link>
        </h1>
        <div className="pt-[4px] gap-x-3 flex flex-row">
          <Link
            href={"/admin/categoria"}
            className="text-white font-light text-sm"
          >
            Mis categorias
          </Link>
          <Link href={"/admin/menu"} className="text-white font-light text-sm">
            Mis menús
          </Link>
          <Link href={"/admin/plato"} className="text-white font-light text-sm">
            Mis platos
          </Link>
          <Link
            href={"/admin/ingrediente"}
            className="text-white font-light text-sm"
          >
            Mis ingredientes
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
