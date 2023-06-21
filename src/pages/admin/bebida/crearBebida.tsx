import { getAllCategoriasBebidas } from "@/api/categoria";
import BebidaFormulario from "@/components/admins/bebida/BebidaFormulario";
import AdministradorAutorizado from "@/components/admins/ui/AdministradorAutorizado";
import VerificarEstablecimiento from "@/components/admins/ui/VerificarEstablecimiento";
import UsuarioAutorizado from "@/components/layout/UsuarioAutorizado";
import { EstablecimientoContext } from "@/context/EstablecimientoContext";
import { Categoria } from "@/types/Categoria";
import { useContext, useEffect, useState } from "react";

export default function CrearPlato() {
  const { establecimientoGlobal } = useContext(EstablecimientoContext);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let categoriasAux = [];
      if (establecimientoGlobal.id != undefined) {
        categoriasAux = await getAllCategoriasBebidas(establecimientoGlobal.id);
      }
      setCategorias(categoriasAux);
    };

    fetchIngredientes();
  }, [establecimientoGlobal]);

  const DEFAULT_BEBIDA = {
    id: "",
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    imagenURL: "",
  };
  return (
    <UsuarioAutorizado>
      <AdministradorAutorizado>
        <VerificarEstablecimiento>
          <BebidaFormulario
            bebidaEditar={DEFAULT_BEBIDA}
            categorias={categorias}
          />
        </VerificarEstablecimiento>
      </AdministradorAutorizado>
    </UsuarioAutorizado>
  );
}
