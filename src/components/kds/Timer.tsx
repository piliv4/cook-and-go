import { useEffect, useState } from "react";

export default function Timer({
  setColorFondo,
  fechaIni,
}: {
  setColorFondo: Function;
  fechaIni: string;
}) {
  const fechaActual: Date = new Date();

  // Obtener la fecha de origen en formato ISO 8601
  const fechaOrigen: Date = new Date(fechaIni);

  // Obtener la diferencia en milisegundos entre la fecha actual y la fecha de origen
  const diferenciaMilisegundos: number =
    fechaActual.getTime() - fechaOrigen.getTime();

  // Obtener la diferencia en segundos
  const diferenciaSegundos: number = Math.floor(diferenciaMilisegundos / 1000);

  const [counter, setCounter] = useState(diferenciaSegundos);
  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);

    if (1 <= Math.floor(counter / 60) && Math.floor(counter / 60) < 5) {
      setColorFondo("bg-[#faf36e]");
    } else if (Math.floor(counter / 60) >= 5) {
      setColorFondo("bg-red-500");
    }
  }, [counter, setColorFondo]);
  return (
    <span>
      {Math.floor(counter / 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
      :
      {(counter % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </span>
  );
}
