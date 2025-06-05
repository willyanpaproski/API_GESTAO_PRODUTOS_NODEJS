class ProdutoDTO
{
    constructor(data)
    {
        Object.assign(this, data);
    }

    static fromModel(model)
    {
        return new ProdutoDTO({
            _id: model._id,
            nome: model.nome,
            descricao: model.descricao,
            quantidade: model.quantidade,
            preco: model.preco,
            categorias: model.categorias,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
        });
    }
}

module.exports = ProdutoDTO;