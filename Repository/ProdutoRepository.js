const mongoose = require('mongoose');
const Produto = require('../Models/ProdutoModel');

class ProdutoRepository
{
    async findProdutosComMaiorQuantidade()
    {
        return await Produto.find()
            .sort({ quantidade: -1 })
            .limit(10);
    }

    async findProdutoByCategoriaId(
        categoriaId,
        {
            page = 1,
            limit = 10,
            sort = {}
        } = {}
    )
    {
        if (!mongoose.Types.ObjectId.isValid(categoriaId)) return []; 

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            Produto.find({
                categorias: categoriaId
            }).sort(sort).skip(skip).limit(limit),
            Produto.countDocuments({
                categorias: categoriaId
            })
        ]);

        return {
            data: items,
            total,
            page,
            limit,
            totalPerPage: Math.ceil(total / limit)
        }
    }
}

module.exports = ProdutoRepository;