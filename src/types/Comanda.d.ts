import { ArticuloDeComanda } from "./ArticuloDeComanda";

export interface Comanda {
  id: string;
  fechaFin: string;
  fechaIni: string;
  enServicio: Boolean;
  mesaNombre: string;
  platos: ArticuloDeComanda[];
}
