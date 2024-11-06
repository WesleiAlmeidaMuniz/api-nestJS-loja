import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string) {
    const pedidoCriado = await this.pedidoService.cadastroPedido(usuarioId);
    return pedidoCriado;
  }

  @Get()
  async listaPedido(@Query('usuarioId') usuarioId: string) {
    const listaPedidos =
      await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
    return listaPedidos;
  }
}
