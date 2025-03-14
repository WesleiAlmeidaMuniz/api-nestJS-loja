import { PedidoEntity } from '../../modulos/pedido/entities/pedido.entity';
import { StatusPedido } from '../../modulos/pedido/enum/statuspedido.enum';
import { usuarioEntity } from '../usuarios/user-entity-list.mock';

export const pedidoEntity: PedidoEntity[] = [
  {
    id: 1,
    usuario: usuarioEntity[0],
    itensPedido: [],
    status: StatusPedido.EM_PROCESSAMENTO,
    valorTotal: 150,
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 2,
    usuario: usuarioEntity[1],
    itensPedido: [],
    status: StatusPedido.PROCESSADO,
    valorTotal: 190,
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 3,
    usuario: usuarioEntity[2],
    itensPedido: [],
    status: StatusPedido.CANCELADO,
    valorTotal: 1500,
    createdAt: new Date(),
    updateAt: new Date(),
  },
];
