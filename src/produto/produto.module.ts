import { Module } from '@nestjs/common';
import { ProdutosController } from './produto.controller';
import { ProdutosRepository } from './produto.repository';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosRepository],
})
export class ProdutoModule {}
