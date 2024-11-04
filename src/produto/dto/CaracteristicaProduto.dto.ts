import { IsString } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class CaracteristicaProdutoDTO {
  id: string;
  @IsString()
  nome: string;
  @IsString()
  descricao: string;
  produto: ProdutoEntity;
}
