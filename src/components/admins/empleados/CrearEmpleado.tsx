import router from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";

const CrearEmpleado = () => {
  return (
    <div
      className="min-h-[70px] bg-white border group border-gray-200 rounded-lg relative flex flex-col  sm:hover:scale-110 transition duration-150 overflow-hidden"
      onClick={() => router.push("/admin/empleado/crearEmpleado")}
    >
      <div className="h-full flex justify-center items-center ">
        <BsPlusCircleFill
          className="fill-secondaryGreen group-hover:fill-secondaryOrange transition duration-150 group-hover:scale-110 pt-3"
          size={50}
        />
      </div>
      <div className="py-2 font-light flex justify-center group-hover:text-primaryOrange transition duration-150 group-hover:scale-105 ">
        Nuevo empleado
      </div>
    </div>
  );
};
export default CrearEmpleado;
