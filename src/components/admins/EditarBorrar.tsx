import { Categoria } from "@/types/types";
import { useState } from "react";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import CrearCategoriaPopup from "./categoria/CrearCategoriaPopup";

const EditarborrarCategoria = ({
  categoria,
  borrarCategoria,
}: {
  categoria: Categoria;
  borrarCategoria: Function;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 absolute right-2 top-2 gap-1 z-10">
      <BsFillPencilFill
        className="group fill-white hover:fill-secondaryOrange transition duration-150"
        onClick={() => setOpen(true)}
      />
      <BsTrashFill
        className="fill-white hover:fill-secondaryOrange transition duration-150"
        onClick={() => borrarCategoria()}
      />

      <CrearCategoriaPopup
        cerrarPopUp={() => setOpen(false)}
        open={open}
        categoriaEditar={categoria}
      />
    </div>
  );
};
export default EditarborrarCategoria;
