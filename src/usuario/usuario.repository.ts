import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarios) => usuarios.email === email,
    );

    return possivelUsuario !== undefined;
  }
}
