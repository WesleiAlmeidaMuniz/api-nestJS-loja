import { CaracteristicaProdutoDTO } from './dto/CaracteristicaProduto.dto';
import { ImagensDTO } from './dto/Imagens.dto';

export class ProdutoEntity {
  usuarioId: string;
  nome: string;
  valor: number;
  quantidadeDisponivel: number;
  descricao: string;
  caracteristicas: CaracteristicaProdutoDTO[];
  imagens: ImagensDTO[];
  categoria: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
