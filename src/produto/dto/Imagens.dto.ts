import { IsString } from 'class-validator';

export class ImagensDTO {
  @IsString({ message: 'Url precisa ser uma string' })
  url: string;
  @IsString({ message: 'Url precisa ser uma string' })
  descricao: string;
}
