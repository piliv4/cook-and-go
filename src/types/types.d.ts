// export interface Ingrediente {
//   id: string;
//   nombre: string;
//   descripcion: string;
//   precioSuplemento: number;
// }

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  imagenURL: string;
}

export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagenURL: string;
  ingredientes: Ingrediente[];
}

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

export interface Local {
  id: string;
  nombre: string;
  descripcion: string;
  cif: string;
  correo: string;
  web: string;
  telefono: string;
  ciudad: string;
  direccion: string;
}
