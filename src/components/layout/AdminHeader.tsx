import Link from "next/link";
import { useState } from "react";

const AdminHeader = () => {
  const [selectedOption, setSelectedOption] = useState(-1);
  return (
    <div className="flex justify-center bg-background">
      <div className="bg-primaryGreen py-2 px-8 flex flex-row mb-4 gap-x-3 rounded-b-full w-[95%]  text-white">
        <h1 className="font-bold text-lg px-2 text-white">
          <Link href={"/"} onClick={() => setSelectedOption(-1)}>
            Cook&Go
          </Link>
        </h1>
        <div className="mt-[3px] gap-x-3 flex flex-row">
          <Link
            href={"/admin/categoria"}
            className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px]  ${
              selectedOption == 0 && " underline   "
            }`}
            onClick={() => setSelectedOption(0)}
          >
            Mis categorias
          </Link>
          <Link
            href={"/admin/menu"}
            className={` px-2 pt-[1px] font-light text-sm  transition duration-200 hover:underline underline-offset-[5px] ${
              selectedOption == 1 && " underline "
            }`}
            onClick={() => setSelectedOption(1)}
          >
            Mis menús
          </Link>
          <Link
            href={"/admin/plato"}
            className={` px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
              selectedOption == 2 && "underline "
            }`}
            onClick={() => setSelectedOption(2)}
          >
            Mis platos
          </Link>
          <Link
            href={"/admin/ingrediente"}
            className={`px-2 pt-[1px] font-light text-sm transition duration-200 hover:underline underline-offset-[5px] ${
              selectedOption == 3 && "underline "
            }`}
            onClick={() => setSelectedOption(3)}
          >
            Mis ingredientes
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
