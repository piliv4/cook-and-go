import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
const EditarBorrar = () => {
  return (
    <div className="grid grid-cols-2 absolute right-2 top-2 gap-1 z-10">
      <BsFillPencilFill className="group fill-white hover:fill-secondaryOrange transition duration-150" />
      <BsTrashFill className="fill-white hover:fill-secondaryOrange transition duration-150" />
    </div>
  );
};
export default EditarBorrar;
