import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ProdutoEntity } from '../entities/produto.entity';

export class CaracteristicaProdutoDTO {
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {
  id: number;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {
  @IsString({ message: 'O nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode estar vázio' })
  nome: string;

  @IsNumber(undefined, { message: 'Valor precisa ser um numero!' })
  @IsNotEmpty({ message: 'Valor não pode estar vázio' })
  valor: number;

  @IsNumber(undefined, { message: 'Quantidade precisa ser um numero' })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  quantidadeDisponivel: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString({ message: 'A Categoria precisa ser uma string' })
  @IsNotEmpty({ message: 'Categoria não pode estar vázio' })
  categoria: string;
}
