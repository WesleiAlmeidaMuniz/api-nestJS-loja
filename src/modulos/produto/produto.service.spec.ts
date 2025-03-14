import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { produtoRepositoryMock } from '../../testing/produto/produto-Repository-Mock';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './entities/produto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { criaProdutoDTO } from '../../testing/produto/create-pedido.dto.mock';
import { produtoEntity } from '../../testing/produto/produto-entity-list.mock';
import { atualizaProdutoDTO } from '../../testing/produto/update-produto.dto';

describe('ProdutoService', () => {
  let produtoService: ProdutoService;
  let produtoRepository: Repository<ProdutoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoService, produtoRepositoryMock],
    }).compile();

    produtoService = module.get<ProdutoService>(ProdutoService);
    produtoRepository = module.get(getRepositoryToken(ProdutoEntity));
  });

  test('Validar a definição,', () => {
    expect(produtoService).toBeDefined();
    expect(produtoRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(produtoRepository, 'exists').mockResolvedValueOnce(false);
      const result = await produtoService.criaProduto(criaProdutoDTO);

      expect(result).toEqual(produtoEntity[0]);
    });
  });

  describe('Read', () => {
    test('method list', async () => {
      const result = await produtoService.listProdutos();

      expect(result).toEqual(
        expect.arrayContaining(
          produtoEntity.map(
            ({
              id,
              createdAt,
              updateAt,
              valor,
              itensPedido,
              deletedAt,
              ...rest
            }) => expect.objectContaining(rest),
          ),
        ),
      );
    });

    test('method show', async () => {
      const result = await produtoService.listaUmProduto(1);

      expect(result).toEqual(produtoEntity[0]);
    });
  });

  describe('Update', () => {
    test('method update', async () => {
      const result = await produtoService.atualizaProduto(
        1,
        atualizaProdutoDTO,
      );

      expect(result).toEqual(produtoEntity[0]);
    });
  });

  describe('Delete', () => {
    test('method delete', async () => {
      const result = await produtoService.deletaProduto(1);

      expect(result).toEqual(true);
    });
  });
});
