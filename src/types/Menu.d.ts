import { Plato } from "./Ingrediente";

export interface Menu {
  id: string;
  nombre: string;
  precio: number;
  comensales: number;
  incluyePan: boolean;
  incluyeBebida: boolean;
  entrantes: Plato[];
  primeros: Plato[];
  segundos: Plato[];
  postres: Plato[];
}
