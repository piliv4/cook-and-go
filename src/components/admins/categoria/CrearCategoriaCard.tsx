import { BsPlusCircleFill } from "react-icons/bs";

const CrearCategoriaCard = () => {
  return (
    <div className="bg-white border group border-gray-200 rounded-lg relative flex flex-col  hover:scale-110 transition duration-150 overflow-hidden">
      <div className="h-full flex justify-center items-center ">
        <BsPlusCircleFill
          className="fill-secondaryGreen group-hover:fill-secondaryOrange transition duration-150 group-hover:scale-110"
          size={50}
        />
      </div>
      <div className="py-2 font-light flex justify-center group-hover:text-primaryOrange transition duration-150 group-hover:scale-105 ">
        Nueva categoria
      </div>
    </div>
  );
};
export default CrearCategoriaCard;
