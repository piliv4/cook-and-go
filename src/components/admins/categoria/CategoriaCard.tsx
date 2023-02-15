import supabase from "@/server/client";
import Link from "next/link";

type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
};

export async function borrarCategoria(id: string) {
  console.log(id);
  const { data, error } = await supabase
    .from("Categoria")
    .delete()
    .eq("id", id);
  console.log(error);
}
export default function CategoriaCard({
  categoria,
  recargar,
}: {
  categoria: Categoria;
  recargar: Function;
}) {
  function borrarRecargarCategoria() {
    borrarCategoria(categoria.id);
  }
  return (
    <div className="border-[1px] rounded-md flex flex-col " key={categoria.id}>
      <div className="px-2">
        <div className="grid grid-cols-[95%_5%]">
          <h1 className="font-medium">{categoria.nombre}</h1>
          <p
            className="text-right hover:cursor-pointer"
            onClick={(e) => borrarRecargarCategoria()}
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
