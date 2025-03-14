import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoEntity } from '../../modulos/produto/entities/produto.entity';
import { produtoEntity } from './produto-entity-list.mock';

export const produtoRepositoryMock = {
  provide: getRepositoryToken(ProdutoEntity),
  useValue: {
    exists: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(produtoEntity[0]),
    find: jest.fn().mockResolvedValue(produtoEntity),
    findBy: jest.fn().mockResolvedValue(produtoEntity),
    findOne: jest.fn().mockResolvedValue(produtoEntity[0]),
    findOneBy: jest.fn().mockResolvedValue(produtoEntity[0]),
    delete: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(produtoEntity[0]),
  },
};
