import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagensDTO } from './Imagens.dto';
import { Type } from 'class-transformer';

export class AtualizaProdutoDTO {
  @IsUUID(undefined, { message: 'ID do produto inválido' })
  @IsOptional()
  id: string;
  @IsString({ message: 'O nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode estar vázio' })
  @IsOptional()
  nome: string;
  @IsNumber(undefined, { message: 'Valor precisa ser um numero!' })
  @IsNotEmpty({ message: 'Valor não pode estar vázio' })
  @IsOptional()
  valor: number;
  @IsNumber(undefined, { message: 'Quantidade precisa ser um numero' })
  @IsOptional()
  quantidade_disponivel: number;
  @IsString({ message: 'Descrição precisa ser uma string' })
  @IsOptional()
  descricao: string;
  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];
  @ValidateNested()
  @IsArray()
  @Type(() => ImagensDTO)
  @IsOptional()
  imagens: ImagensDTO[];
  @IsString({ message: 'A Categoria precisa ser uma string' })
  @IsNotEmpty({ message: 'Categoria não pode estar vázio' })
  @IsOptional()
  categoria: string;
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'Data não pode estar vázio' })
  @IsOptional()
  dataCriacao: Date;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataAtualizacao: Date;
}
