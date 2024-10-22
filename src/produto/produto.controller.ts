import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutosRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosRepository: ProdutosRepository) {}

  @Post()
  async cadastrarProduto(@Body() dadosProdutos: CriaProdutoDTO) {
    this.produtosRepository.salvar(dadosProdutos);
    return dadosProdutos;
  }

  @Get()
  async listarProdutos() {
    return this.produtosRepository.listar();
  }
}
