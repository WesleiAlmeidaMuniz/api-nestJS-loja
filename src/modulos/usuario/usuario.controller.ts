import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from '../../recursos/pipes/hashear-senha.pipe';
import { AutenticacaoGuard } from '../autenticacao/autenticacao/autenticacao.guard';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    const usuarioCriado = await this.usuarioService.criaUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });

    return {
      usuario: new ListaUsuarioDTO(
        usuarioCriado.id,
        usuarioCriado.nome,
        usuarioCriado.email,
      ),
      messagem: 'usuário criado com sucesso',
    };
  }

  @UseGuards(AutenticacaoGuard)
  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();

    return usuariosSalvos;
  }

  @UseGuards(AutenticacaoGuard)
  @Get('/:email')
  async buscaPorEmail(@Param('email') email: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    return usuario;
  }

  @UseGuards(AutenticacaoGuard)
  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: number,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @UseGuards(AutenticacaoGuard)
  @Delete('/:id')
  async removeUsuario(@Param('id') id: number) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }
}
