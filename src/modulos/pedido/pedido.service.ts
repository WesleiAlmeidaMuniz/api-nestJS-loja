import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';
import { In, Repository } from 'typeorm';

import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';

import { ProdutoEntity } from '../produto/entities/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';
import { ItemPedidoEntity } from './entities/itempedido.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { ProdutoService } from '../produto/produto.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    private readonly usuarioService: UsuarioService,
    private readonly produtoService: ProdutoService,
  ) {}

  private trataDadosDoPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(
          `O produto com id ${itemPedido.produtoId} não foi encontrado`,
        );
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponivel (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}`,
        );
      }
    });
  }

  async cadastroPedido(usuarioId: number, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.usuarioService.buscaUmUsuario(usuarioId);

    if (!usuario) throw new NotFoundException('Usuario não encontrado');

    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    const produtosRelacionados =
      await this.produtoService.buscarProdutosPorIds(produtosIds);

    await this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!;
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: number) {
    const usuario = await this.usuarioService.buscaUmUsuario(usuarioId);

    if (usuario === null) {
      throw new NotFoundException('O usuario não foi encontrado');
    }

    return this.pedidoRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: number, dto: AtualizaPedidoDTO, usuarioId: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: { usuario: true },
    });

    if (pedido == null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }

    if (pedido.usuario.id !== Number(usuarioId))
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse pedido',
      );

    return this.pedidoRepository.update(pedido, dto);
  }

  async deletaPedido(id: number) {
    await this.exist(id);

    await this.pedidoRepository.delete(id);

    return true;
  }

  async exist(id: number) {
    if (!(await this.pedidoRepository.exists({ where: { id } }))) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
