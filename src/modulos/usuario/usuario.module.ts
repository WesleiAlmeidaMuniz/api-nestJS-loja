import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailEhUnicoValidator } from './validacao/email-he-unico.validator';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator],
  exports: [UsuarioService],
})
export class UsuarioModule {}
