import { useState } from "react";
import { BsTrash } from "react-icons/bs";
const SeccionMenu = ({ titulo }: { titulo: string }) => {
  return (
    <div className="flex justify-center flex-col">
      <div className="font-black pt-4  border-b-[1px] border-primaryGreen flex flex-row">
        <h1 className="w-full">{titulo}</h1>
        <label className="font-light pr-1">Incluir</label>
        <input className="accent-primaryOrange " type="checkbox" />
      </div>
      <div className="">
        <div className="flex flex-row py-1 border-b-[2px] border-primaryOrange border-dotted ">
          <p className="w-full">Plato</p>
          <BsTrash className=" self-end" />
        </div>
        <p>Añadir plato</p>
      </div>
    </div>
  );
};
export default SeccionMenu;
