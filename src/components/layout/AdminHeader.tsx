import Link from "next/link";
import { useState } from "react";

const AdminHeader = () => {
  const [selectedOption, setSelectedOption] = useState(-1);
  return (
    <div className="flex justify-center">
      <div className="bg-blue-600 py-2 px-8 flex flex-row mb-4 gap-x-3 rounded-b-full w-[95%] ">
        <h1 className="font-bold text-lg px-2 text-white">
          <Link href={"/"} onClick={() => setSelectedOption(-1)}>
            Cook&Go
          </Link>
        </h1>
        <div className="mt-[3px] gap-x-3 flex flex-row">
          <Link
            href={"/admin/categoria"}
            className={`text-white px-2 pt-[1px] font-light text-sm ${
              selectedOption == 0 && "text-blue-600 bg-white rounded-md"
            }`}
            onClick={() => setSelectedOption(0)}
          >
            Mis categorias
          </Link>
          <Link
            href={"/admin/menu"}
            className={`text-white px-2 pt-[1px] font-light text-sm ${
              selectedOption == 1 && "text-blue-600 bg-white rounded-md"
            }`}
            onClick={() => setSelectedOption(1)}
          >
            Mis menús
          </Link>
          <Link
            href={"/admin/plato"}
            className={`text-white px-2 pt-[1px] font-light text-sm ${
              selectedOption == 2 && "text-blue-600 bg-white rounded-md"
            }`}
            onClick={() => setSelectedOption(2)}
          >
            Mis platos
          </Link>
          <Link
            href={"/admin/ingrediente"}
            className={`text-white px-2 pt-[1px] font-light text-sm ${
              selectedOption == 3 && "text-blue-600 bg-white rounded-md"
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
