import { CaracteristicaProdutoDTO } from './dto/CaracteristicaProduto.dto';
import { ImagensDTO } from './dto/Imagens.dto';

export class ProdutoEntity {
  usuarioId: string;
  id: string;
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

class CaracteristicaProduto {
  nome: string;
  descricao: string;
}
class ImagemProduto {
  url: string;
  descricao: string;
}
