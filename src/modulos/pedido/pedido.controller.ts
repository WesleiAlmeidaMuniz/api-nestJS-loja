import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    const usuarioId = req.usuario.sub;
    const pedidoCriado = await this.pedidoService.cadastroPedido(
      usuarioId,
      dadosDoPedido,
    );
    return pedidoCriado;
  }

  @Get()
  async listaPedido(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
    return pedidos;
  }

  @Patch(':id')
  atualizaPedido(
    @Req() req: RequisicaoComUsuario,
    @Param('id') pedidoId: number,
    @Body() dadosDeAtualizacao: AtualizaPedidoDTO,
  ) {
    const usuarioId = req.usuario.sub;
    return this.pedidoService.atualizaPedido(
      pedidoId,
      dadosDeAtualizacao,
      usuarioId,
    );
  }

  @Delete(':id')
  deletaPedido(@Param('id') pedidoId: string) {
    return this.pedidoService.deletaPedido(pedidoId);
  }
}
