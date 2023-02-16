import supabase from "@/server/client";
import Link from "next/link";
import { Categoria } from "@/types/types";

export default function CategoriaCard({
  categoria,
  recargar,
}: {
  categoria: Categoria;
  recargar: Function;
}) {
  async function borrarCategoria() {
    const { data, error } = await supabase
      .from("Categoria")
      .delete()
      .eq("id", categoria.id);
    console.log(error);
    if (!error) {
      recargar();
    }
  }
  return (
    <div className="border-[1px] rounded-md flex flex-col " key={categoria.id}>
      <div className="px-2">
        <div className="grid grid-cols-[95%_5%]">
          <h1 className="font-medium">{categoria.nombre}</h1>
          <p
            className="text-right hover:cursor-pointer"
            onClick={borrarCategoria}
          >
            x
          </p>
        </div>
        <p className="text-sm">{categoria.descripcion}</p>
      </div>
      <Link href={"/#"} className="font-light text-center border-t-[1px]">
        Ver en detalle
      </Link>
    </div>
  );
}
