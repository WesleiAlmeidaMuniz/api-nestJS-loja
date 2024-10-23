import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-he-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  nome: string;
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailEhUnico({ message: 'Já Existe um usuário com este e-mail' })
  email: string;
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
