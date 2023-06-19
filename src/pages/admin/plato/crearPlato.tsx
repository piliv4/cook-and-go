import { getAllCategoriasPlatos } from "@/api/categoria";
import PlatoFormulario from "@/components/admins/plato/PlatoFormulario";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Categoria } from "@/types/Categoria";
import { useContext, useEffect, useState } from "react";

export default function CrearPlato() {
  const DEFAULT_PLATO = {
    id: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    imagenURL: "",
    ingredientes: [],
  };
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { establecimientoGlobal } = useContext(EstablecimientoContext);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasPlatos(establecimientoGlobal.id);
      }
      setCategorias(categoriasAux);
    };
    fetchIngredientes();
  }, [establecimientoGlobal]);

  return (
    <UsuarioAutorizado>
      <PlatoFormulario platoEditar={DEFAULT_PLATO} categorias={categorias} />
    </UsuarioAutorizado>
  );
}
