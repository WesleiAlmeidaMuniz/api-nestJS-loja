import { IsString } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class ImagensDTO {
  id: string;
  @IsString({ message: 'Url precisa ser uma string' })
  url: string;
  @IsString({ message: 'Url precisa ser uma string' })
  descricao: string;
  produto: ProdutoEntity;
}
