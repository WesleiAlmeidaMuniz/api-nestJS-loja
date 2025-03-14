import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    if (
      await this.usuarioRepository.exists({
        where: { email: dadosDoUsuario.email },
      })
    ) {
      throw new BadRequestException('Este e-mail já está sendo usado.');
    }
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;

    return this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuarioLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome, usuario.email),
    );

    return usuarioLista;
  }

  async buscaUmUsuario(id: number) {
    await this.exist(id);

    return this.usuarioRepository.findOneBy({ id });
  }

  async atualizaUsuario(id: number, novosDados: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O Usuario não foi encontrado');
    }

    Object.assign(usuario, novosDados);

    return this.usuarioRepository.save(usuario);
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }

  async deletaUsuario(id: number) {
    await this.exist(id);

    await this.usuarioRepository.delete(id);

    return true;
  }

  async exist(id: number) {
    if (!(await this.usuarioRepository.exists({ where: { id } }))) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
