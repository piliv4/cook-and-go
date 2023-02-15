import { useEffect, useState } from "react";

export default function Timer({ setColorFondo }: { setColorFondo: Function }) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);

    if (1 <= Math.floor(counter / 60) && Math.floor(counter / 60) < 5) {
      setColorFondo("bg-amber-500");
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
