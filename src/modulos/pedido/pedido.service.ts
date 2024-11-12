import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Not, Repository } from 'typeorm';
import { UsuarioEntity } from '../../modulos/usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(id) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('O usuário não foi encontrado');

    return usuario;
  }

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

  async cadastroPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    const usuario = await this.buscaUsuario(usuarioId);

    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId,
    );
    const produtosRelacionados = await this.produtoRepository.findBy({
      id: In(produtosIds),
    });

    this.trataDadosDoPedido(dadosDoPedido, produtosRelacionados);

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

  async obtemPedidosDeUsuario(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

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

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO, usuarioId: string) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: { usuario: true },
    });

    if (pedido == null) {
      throw new NotFoundException('O pedido não foi encontrado');
    }

    if (pedido.usuario.id !== usuarioId)
      throw new ForbiddenException(
        'Você não tem autorização para atualizar esse pedido',
      );

    Object.assign(pedido, dto);

    return this.pedidoRepository.save(pedido);
  }

  async deletaPedido(id: string) {
    const resultado = await this.pedidoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O pedido não foi encontrado');
    }
  }
}
