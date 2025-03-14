import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';
import { AutenticacaoGuard } from '../autenticacao/autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado =
      await this.produtoService.criaProduto(dadosProduto);
    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listProdutos();
  }

  @Get('/:id')
  async listaUm(@Param('id') id: number) {
    const produtoSalvo = await this.produtoService.listaUmProduto(id);

    console.log('Produto sendo buscado do BD!');

    return produtoSalvo;
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: number,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: `produto com ${id} atualizado com sucesso`,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
