import { AtualizaPedidoDTO } from '../../modulos/pedido/dto/AtualizaPedido.dto';
import { StatusPedido } from '../../modulos/pedido/enum/statuspedido.enum';

export const atualizaPedidoDTO: AtualizaPedidoDTO = {
  status: StatusPedido.PROCESSADO,
};
