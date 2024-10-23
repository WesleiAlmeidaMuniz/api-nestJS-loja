import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutosRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
    return produto;
  }

  async listar() {
    return this.produtos;
  }

  private buscaPorID(id: string) {
    const possivelProduto = this.produtos.find(
      (produtoSalvo) => produtoSalvo.id === id,
    );

    if (!possivelProduto) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }

    return possivelProduto;
  }

  async atualiza(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const produto = this.buscaPorID(id);
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
    });
    return produto;
  }

  async remove(id: string) {
    const produto = this.buscaPorID(id);
    this.produtos = this.produtos.filter(
      (produtoSalvo) => produtoSalvo.id !== id,
    );

    return produto;
  }
}
