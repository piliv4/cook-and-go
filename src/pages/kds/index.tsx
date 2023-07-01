import { getComandasByEstablecimiento } from "@/api/comanda";
import ComandaComponente from "@/components/kds/Comanda";
import supabase from "@/server/client";
import { Comanda } from "@/types/Comanda";
import { useEffect, useState } from "react";

export default function KDS() {
  const [comandas, setComandas] = useState<Comanda[]>([]);

  function finalizarComanda({ index }: { index: number }) {
    const aux = [...comandas];
    aux.splice(index, 1);
    setComandas(aux);
  }

  useEffect(() => {
    const channel = supabase
      .channel("realtime_comandas")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Comanda",
        },
        (payload) => {
          console.log({ payload });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  useEffect(() => {
    const fetchIngredientes = async () => {
      let comandasAux = [] as Comanda[];
      comandasAux = await getComandasByEstablecimiento(
        "b7640f12-7240-4856-a6f7-8e5bc1bddad2"
      );
      setComandas(comandasAux);
    };
    fetchIngredientes();
  }, []);

  return (
    <div className="max-w-xl min-w-full">
      <div className="bg-blue-600 py-3 grid grid-cols-[80%_20%] mb-4">
        <h1 className="font-bold text-lg px-2 text-white">
          KDS (kitchen dispay system)
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-3 px-3">
        {comandas.map((comanda, index) => (
          <ComandaComponente
            key={index}
            comanda={comanda}
            index={index}
            finalizarComanda={finalizarComanda}
          />
        ))}
      </div>
    </div>
  );
}
