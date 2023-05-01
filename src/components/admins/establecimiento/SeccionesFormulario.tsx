import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";

const SeccionesFormulario = ({}: {}) => {
  const [seccion, setSeccion] = useState([]);

  return (
    <div>
      <h1 className="w-full border-b-2 pb-1 text-center pt-4 font-black text-lg border-primaryGreen">
        ESTABLECER SECCIONES
      </h1>
      <div>
        <p className=" mt-4 px-2 font-black ml-2 bg-background inline-block">
          Primera planta
        </p>
        <div className="-mt-[12px] border-2  border-secondaryGreen ">
          <div className="flex flex-row border-b-2 border-dotted border-primaryOrange m-2 mt-4">
            <p>1. </p>
            <p> Mesa</p>
            <p className="w-full text-center">4 comensales</p>
            <BsTrashFill className="" />
          </div>
          <div className="flex flex-row border-b-2 border-dotted border-primaryOrange m-2 mt-4">
            <p>1. </p>
            <p> Mesa</p>
            <p className="w-full text-center">4 comensales</p>
            <BsTrashFill className="" />
          </div>
          <div className="flex flex-row border-2 border-primaryOrange m-2 mt-4 p-1">
            <select className=" bg-transparent">
              <option>Mesa</option>
              <option>Barra</option>
              <option>Barril</option>
            </select>

            <div className="w-full flex flex-row justify-center">
              <input
                type="number"
                defaultValue={1}
                className="w-6 text-right border-2"
              ></input>
              <p className="text-center">comensales</p>
            </div>
            <button className="bg-primaryOrange px-2 rounded-md font-black text-white">
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeccionesFormulario;
