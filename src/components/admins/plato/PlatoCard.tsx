import supabase from "@/server/client";
import Link from "next/link";
import { Plato } from "@/types/types";

export default function PLatoCard({
  plato,
  recargar,
}: {
  plato: Plato;
  recargar: Function;
}) {
  async function borrarCategoria() {
    console.log("CULO");
    //TENGO QUE APRENDER A HACER EL BORRADO EN CASCADA
    // const { error } = await supabase
    //   .from("Articulo")
    //   .delete()
    //   .eq("id", plato.id);
    // console.log(error);
    // if (!error) {
    //   recargar();
    // }
  }
  return (
    <div className="border-[1px] rounded-md flex flex-col " key={plato.id}>
      <div className="px-2">
        <div className="grid grid-cols-[95%_5%]">
          <h1 className="font-medium">{plato.nombre}</h1>
          <p
            className="text-right hover:cursor-pointer"
            onClick={borrarCategoria}
          >
            x
          </p>
        </div>
        <p className="text-sm">{plato.descripcion}</p>
      </div>
      <Link
        href={"/admin/plato/" + plato.id}
        className="font-light text-center border-t-[1px]"
      >
        Ver en detalle
      </Link>
    </div>
  );
}
