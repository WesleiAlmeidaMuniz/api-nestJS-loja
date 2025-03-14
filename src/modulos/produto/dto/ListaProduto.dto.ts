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
    readonly id: number,
    readonly nome: string,
    readonly quantidadeDisponivel: number,
    readonly categoria: string,
    readonly descricao: string,
    readonly caracteristicas: ListaCaracteristicaProdutoDTO[],
    readonly imagem: ListaImagemProdutoDTO[],
  ) {}
}
