import { Ingrediente } from "./Ingrediente";
export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenURL: string;
  ingredientes: Ingrediente[];
}
