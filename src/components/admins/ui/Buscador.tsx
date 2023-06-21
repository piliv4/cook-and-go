import { BiSearch } from "react-icons/bi";
const Buscador = () => {
  return (
    <div className="grid grid-cols-[90%_10%] bg-primaryOrange px-4 rounded-full justify-center align-middle items-center">
      <input
        className="bg-transparent text-white placeholder-white outline-none focus:outline-none"
        type="text"
        placeholder="Buscar..."
      ></input>
      <BiSearch className="stroke-white stroke-[2px]" />
    </div>
  );
};
export default Buscador;
