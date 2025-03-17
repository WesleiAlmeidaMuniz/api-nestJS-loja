import { getRepositoryToken } from '@nestjs/typeorm';
import { PedidoEntity } from '../../modulos/pedido/entities/pedido.entity';
import { pedidoEntity } from './pedido-entity.list.mock';

export const pedidoRepositoryMock = {
  provide: getRepositoryToken(PedidoEntity),
  useValue: {
    save: jest.fn().mockResolvedValue(pedidoEntity[0]),
    find: jest.fn().mockResolvedValue(pedidoEntity[0]),
    findOne: jest.fn().mockResolvedValue(pedidoEntity[0]),
    update: jest.fn().mockResolvedValue(pedidoEntity[1]),
    exists: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
  },
};
