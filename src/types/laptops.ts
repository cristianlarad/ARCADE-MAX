export interface LaptopsType {
  _id: string;
  nombre: string;
  procesador: string;
  memoria_RAM: string;
  almacenamiento: string;
  pantalla: string;
  peso: string;
  puertos: string[];
  batería: string;
  precio: string;
  inStock: boolean;
  tipo: string;
}

export interface LaptopsResponse {
  message: string;
  laptops: LaptopsTypeData[];
}

export interface LaptopsTypeData {
  nombre: string;
  precio: number;
  tipo: string;
  cantidad: number;
  total: number;
  paymentMethod: string;
  descuento: number;
  direccion: string;
}
