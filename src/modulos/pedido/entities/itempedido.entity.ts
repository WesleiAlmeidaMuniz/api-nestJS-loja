import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../../produto/entities/produto.entity';

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pedido: PedidoEntity;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.itensPedido, {
    cascade: ['update'],
  })
  produto: ProdutoEntity;
}
