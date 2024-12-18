import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;

    return this.usuarioRepository.save(usuarioEntity);
  }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuarioLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.email),
    );

    return usuarioLista;
  }

  async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
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

  async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O usuário não foi encontrado');
    }
  }
}
