import { ProdutoEntity } from '../../modulos/produto/entities/produto.entity';
import { mockProduto } from './create-pedido.dto.mock';

export const produtoEntity: ProdutoEntity[] = [
  {
    id: 1,
    nome: 'carrinho de controle remoto',
    valor: 150.0,
    quantidadeDisponivel: 800,
    descricao: 'Produto novo, carrinho muito bonito modelo ferrari',
    categoria: 'Brinquedo',
    caracteristicas: [
      {
        id: 1,
        nome: 'Fabricante',
        descricao: 'Japão',
        produto: mockProduto,
      },
      {
        id: 2,
        nome: 'material',
        descricao: 'Metal',
        produto: mockProduto,
      },
    ],
    imagem: [
      {
        id: 1,
        url: 'https://i.imgur.com/dwDZICq.jpg',
        descricao: 'Imagem do carrinho de controle remoto',
        produto: mockProduto,
      },
    ],
    createdAt: new Date(),
    updateAt: new Date(),
    itensPedido: [],
  },
];
