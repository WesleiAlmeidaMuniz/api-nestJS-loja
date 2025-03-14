import { PedidoService } from './pedido.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userRepositoryMock } from '../../testing/usuarios/user-Repository-Mock';
import { pedidoRepositoryMock } from '../../testing/pedidos/Pedido-Repository-Mock';
import { produtoRepositoryMock } from '../../testing/produto/produto-Repository-Mock';
import { atualizaPedidoDTO } from '../../testing/pedidos/update-pedido.dto.mock';
import { criaPedidoDTO } from '../../testing/pedidos/create-pedido.dto.mock';
import { pedidoEntity } from '../../testing/pedidos/pedido-entity.list.mock';
import { PedidoEntity } from './entities/pedido.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { ProdutoService } from '../produto/produto.service';

describe('PedidoService', () => {
  let pedidoService: PedidoService;
  let pedidoRepository: PedidoEntity;
  let usuarioService: UsuarioService;
  let produtoService: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        UsuarioService,
        ProdutoService,
        pedidoRepositoryMock,
        userRepositoryMock,
        produtoRepositoryMock,
      ],
    }).compile();

    pedidoService = module.get<PedidoService>(PedidoService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    produtoService = module.get<ProdutoService>(ProdutoService);
    pedidoRepository = module.get(getRepositoryToken(PedidoEntity));
  });

  test('Validar a definição', () => {
    expect(pedidoService).toBeDefined();
    expect(pedidoRepository).toBeDefined();
    expect(produtoService).toBeDefined();
    expect(usuarioService).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      const result = await pedidoService.cadastroPedido(1, criaPedidoDTO);

      expect(result).toEqual(pedidoEntity[0]);
    });
  });

  describe('Read', () => {});

  describe('Update', () => {});

  describe('Delete', () => {});
});
