import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';
import { ProdutoModule } from '../produto/produto.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity]),
    ProdutoModule,
    UsuarioModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
