import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StatusPedido } from '../enum/statuspedido.enum';
import { ItemPedidoEntity } from './itempedido.entity';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'pedido' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'valor_total', nullable: false })
  valorTotal: number;

  @Column({ name: 'status', type: 'enum', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  usuario: UsuarioEntity;

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
    cascade: true,
  })
  itensPedido: ItemPedidoEntity[];
}
