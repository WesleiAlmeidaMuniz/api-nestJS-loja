import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-he-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  nome: string;
  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @EmailEhUnico({ message: 'Já Existe um usuário com este e-mail' })
  email: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 6 e 30 caracteres',
  })
  senha: string;
}
