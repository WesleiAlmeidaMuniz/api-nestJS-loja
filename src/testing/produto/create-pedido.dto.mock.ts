import {
  CaracteristicaProdutoDTO,
  CriaProdutoDTO,
  ImagemProdutoDTO,
} from '../../modulos/produto/dto/CriaProduto.dto';
import { ProdutoEntity } from '../../modulos/produto/entities/produto.entity';

export const mockProduto: ProdutoEntity = {
  id: 1,
  nome: 'Carrinho de Controle Remoto',
  valor: 150.0,
  quantidadeDisponivel: 2,
  descricao: 'Produto novo, carrinho muito bonito modelo Ferrari',
  categoria: 'Brinquedo', // Adicionando categoria
  caracteristicas: [], // As características podem ser definidas depois, se necessário
  imagem: [], // Imagens podem ser definidas depois, se necessário
  createdAt: new Date(), // Data de criação mockada
  updateAt: new Date(), // Data de atualização mockada
  itensPedido: [], // Adicionando a propriedade 'itensPedidots' (presumivelmente um array)
};
export const mockCaracteristicaProdutoDTO: CaracteristicaProdutoDTO[] = [
  {
    id: 1,
    nome: 'Fabricante',
    descricao: 'Japão',
    produto: mockProduto,
  },
  {
    id: 2,
    nome: 'Material',
    descricao: 'Metal',
    produto: mockProduto,
  },
];

export const mockImagemProdutoDTO: ImagemProdutoDTO[] = [
  {
    id: 1,
    descricao: 'Imagem do carrinho de controle remoto',
    url: 'https://i.imgur.com/dwDZICq.jpg',
    produto: mockProduto,
  },
];

export const criaProdutoDTO: CriaProdutoDTO = {
  nome: 'carrinho de controle remoto',
  valor: 150.0,
  quantidadeDisponivel: 2,
  descricao: 'Produto novo, carrinho muito bonito modelo ferrari',
  caracteristicas: mockCaracteristicaProdutoDTO,
  imagens: mockImagemProdutoDTO,
  categoria: 'Brinquedo',
};
