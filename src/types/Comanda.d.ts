import { Plato } from "./Plato";

export interface Comanda {
  id: string;
  fechaFin: string;
  fechaIni: string;
  enServicio: Boolean;
  mesaNombre: string;
  platos: Plato[];
}
