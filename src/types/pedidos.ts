interface StatusPEdidosType {
  pedidos: Pedidos[];
}

interface StatusPEdidosItems {
  _id: string;
  cantidad: number;
  descuento: number;
  paymentMethod: string;
  precio: string;
  tipo: string;
  total: number;
  nombre: string;
}

interface Pedidos {
  id: string;
  email: string;
  user_id: string;
  items: StatusPEdidosItems[];
  status: number;
  createdAt: Date;
  aviso: string;
}

export type { StatusPEdidosItems, StatusPEdidosType };
