import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './entities/produto.entity';
import { In, Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    if (
      await this.produtoRepository.exists({
        where: { nome: dadosProduto.nome },
      })
    ) {
      throw new BadRequestException(
        'Já existe um produto cadastrado com esse nome!',
      );
    }
    const produtoEntity = new ProdutoEntity();

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.imagem = dadosProduto.imagens;

    return this.produtoRepository.save(produtoEntity);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagem: true,
        caracteristicas: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.quantidadeDisponivel,
          produto.categoria,
          produto.descricao,
          produto.caracteristicas,
          produto.imagem,
        ),
    );
    return produtosLista;
  }

  async buscarProdutosPorIds(produtosIds: number[]): Promise<ProdutoEntity[]> {
    if (!produtosIds.length) return []; // Retorna array vazio se não houver IDs

    return await this.produtoRepository.findBy({
      id: In(produtosIds),
    });
  }

  async listaUmProduto(id: number) {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        imagem: true,
        caracteristicas: true,
      },
    });

    if (!produto) throw new NotFoundException('O produto não foi encontrado');

    return produto;
  }

  async atualizaProduto(id: number, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    return await this.produtoRepository.update(id, novosDados);
  }

  async deletaProduto(id: number) {
    await this.exist(id);
    await this.produtoRepository.delete(id);
    return true;
  }

  async exist(id: number) {
    if (!(await this.produtoRepository.exists({ where: { id } }))) {
      throw new NotFoundException(`O produto ${id} não existe`);
    }
  }
}
