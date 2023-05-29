export interface Establecimiento {
  id: string;
  nombre: string;
  descripcion: string;
  cif: string;
  correo: string;
  web: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  imagenURL: string;
  secciones: Seccion[];
}

export interface Seccion {
  id: string;
  nombre: string;
  mesas: Mesa[];
}

export interface Mesa {
  id: string;
  tipo: string;
  comensales: number;
}
