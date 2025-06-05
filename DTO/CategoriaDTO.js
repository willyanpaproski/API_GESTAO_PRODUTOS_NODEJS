class CategoriaDTO
{
    constructor(data)
    {
        Object.assign(this, data);
    }

    static fromModel(model)
    {
        return new CategoriaDTO({
            _id: model._id,
            nome: model.nome,
            descricao: model.descricao,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            quantidadeProdutos: 0
        });
    }
}

module.exports = CategoriaDTO;