export interface Ingrediente {
  id: string;
  nombre: string;
  descripcion: string;
  precioSuplemento: number;
}

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
}
