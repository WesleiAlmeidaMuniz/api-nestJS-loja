import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class ItemPedidoDTO {
  @IsNumber()
  produtoId: number;
  @IsInt()
  quantidade: number;
}
export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
