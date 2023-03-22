import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import CrearPlatoPopUp from "./CrearPlatoPopUp";

const CrearPlatoCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="min-h-[200px] bg-white border group border-gray-200 rounded-lg relative flex flex-col  hover:scale-110 transition duration-150 overflow-hidden"
      onClick={() => setOpen(true)}
    >
      <div className="h-full flex justify-center items-center ">
        <BsPlusCircleFill
          className="fill-secondaryGreen group-hover:fill-secondaryOrange transition duration-150 group-hover:scale-110"
          size={50}
        />
      </div>
      <div className="py-2 font-light flex justify-center group-hover:text-primaryOrange transition duration-150 group-hover:scale-105 ">
        Nuevo plato
        <CrearPlatoPopUp
          open={open}
          platoEditar={null}
          cerrarPopUp={() => setOpen(false)}
        />
      </div>
    </div>
  );
};
export default CrearPlatoCard;
