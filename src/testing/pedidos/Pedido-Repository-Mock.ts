import { getRepositoryToken } from '@nestjs/typeorm';
import { PedidoEntity } from '../../modulos/pedido/entities/pedido.entity';
import { pedidoEntity } from './pedido-entity.list.mock';

export const pedidoRepositoryMock = {
  provide: getRepositoryToken(PedidoEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(pedidoEntity[0]),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  },
};
