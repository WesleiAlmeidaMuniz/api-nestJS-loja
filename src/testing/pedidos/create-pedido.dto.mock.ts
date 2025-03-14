import {
  CriaPedidoDTO,
  ItemPedidoDTO,
} from '../../modulos/pedido/dto/CriaPedido.dto';

export const itemPedidoDTO: ItemPedidoDTO = {
  produtoId: 1,
  quantidade: 20,
};

export const criaPedidoDTO: CriaPedidoDTO = {
  itensPedido: [itemPedidoDTO],
};
