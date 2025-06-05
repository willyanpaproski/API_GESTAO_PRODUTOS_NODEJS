const mongoose = require('mongoose');
const Categoria = require('../Models/CategoriaModel');

class CategoriaRepository
{
    async getCategoriasComQuantidadeDeProdutos()
    {
        const categorias = await Categoria.aggregate([
            {
                $lookup: {
                    from: 'produtos',
                    localField: '_id',
                    foreignField: 'categorias',
                    as: 'produtos'
                }
            },
            {
                $addFields: {
                    quantidadeProdutos: { $size: '$produtos' }
                }
            },
            {
                $project: {
                    produtos: 0
                }
            }
        ]);

        return categorias;
    }
}

module.exports = CategoriaRepository;