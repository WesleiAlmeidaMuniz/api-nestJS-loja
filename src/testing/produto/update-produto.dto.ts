import { AtualizaProdutoDTO } from '../../modulos/produto/dto/atualizaProduto.dto';
import { mockProduto } from './create-pedido.dto.mock';

export const atualizaProdutoDTO: AtualizaProdutoDTO = {
  nome: 'Produto atualizado',
  quantidadeDisponivel: 40,
  valor: 120,
  caracteristicas: [
    {
      id: 1,
      nome: 'Corpo de ferro',
      descricao: 'Caracteristica atualizada',
      produto: mockProduto,
    },
  ],
};
