class ListaCaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}
class ListaImagemProdutoDTO {
  url: string;
  descricao: string;
}
export class ListaProdutoDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly quantidade_disponivel: number,
    readonly caracteristicas: ListaCaracteristicaProdutoDTO[],
    readonly imagens: ListaImagemProdutoDTO[],
  ) {}
}
