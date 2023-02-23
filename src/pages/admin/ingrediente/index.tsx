import Link from "next/link";
import supabase from "../../../server/client";
import { Ingrediente } from "@/types/types";
import IngredienteCard from "@/components/admins/ingrediente/IngredienteCard";
import CrearIngrediente from "@/components/admins/ingrediente/CrearIngrediente";
import Buscador from "@/components/admins/Buscador";
import { BsPlus } from "react-icons/bs";
import IngredienteTable from "@/components/admins/ingrediente/IngredienteTable";

export async function getServerSideProps() {
  let { data } = await supabase.from("Ingrediente").select("*");
  return {
    props: {
      ingredientes: data,
    },
  };
}

export default function IngredientesPagina({
  ingredientes,
}: {
  ingredientes: Ingrediente[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[60%_20%_20%] w-full pb-3 border-primaryGreen border-double border-b-4">
        <h1 className="text-2xl font-black ">Mis ingredientes</h1>
        <div>
          {/* <button className="px-2 flex justify-center  items-center border-[1px] w-2/4 border-primaryOrange ">
          <BsPlus size={20} className="stroke-[1px] stroke-primaryOrange " />
        </button> */}
        </div>
        <Buscador />
      </div>
      <IngredienteTable ingrediente={ingredientes} />
    </div>
  );
}
