import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../modulos/usuario/entities/usuario.entity';
import { usuarioEntity } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UsuarioEntity),
  useValue: {
    exists: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(usuarioEntity[0]),
    find: jest.fn().mockResolvedValue(usuarioEntity),
    findOneBy: jest.fn().mockResolvedValue(usuarioEntity[0]),
    findOne: jest.fn(),
    delete: jest.fn(),
  },
};
