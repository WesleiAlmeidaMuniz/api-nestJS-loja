import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { userRepositoryMock } from '../../testing/usuarios/user-Repository-Mock';
import { usuarioEntity } from '../../testing/usuarios/user-entity-list.mock';
import { criarUsuarioDTO } from '../../testing/usuarios/create-user.dto.mock';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { atualizaUsuarioDTO } from '../../testing/usuarios/update-user.dto.mock';

describe('UserService', () => {
  let userService: UsuarioService;
  let userRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService, userRepositoryMock],
    }).compile();

    userService = module.get<UsuarioService>(UsuarioService);
    userRepository = module.get(getRepositoryToken(UsuarioEntity));
  });

  test('Validar a definição,', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const result = await userService.criaUsuario(criarUsuarioDTO);

      expect(result).toEqual(usuarioEntity[0]);
    });
  });

  describe('Read', () => {
    test('method list', async () => {
      const result = await userService.listaUsuarios();

      expect(result).toEqual(
        expect.arrayContaining(
          usuarioEntity.map(({ senha, updateAt, createdAt, ...rest }) =>
            expect.objectContaining(rest),
          ),
        ),
      );
    });

    test('method show', async () => {
      const result = await userService.buscaUmUsuario(1);

      expect(result).toEqual(usuarioEntity[0]);
    });
  });

  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.atualizaUsuario(1, atualizaUsuarioDTO);

      expect(result).toEqual(usuarioEntity[0]);
    });
  });

  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.deletaUsuario(1);

      expect(result).toEqual(true);
    });
  });
});
