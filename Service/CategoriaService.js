const GenericRepository = require('../Repository/GenericRepository');
const Categoria = require('../Models/CategoriaModel');
const CategoriaDTO = require('../DTO/CategoriaDTO');
const Produto = require('../Models/ProdutoModel');
const CategoriaRepository = require('../Repository/CategoriaRepository');

class CategoriaService
{
    constructor()
    {
        this.repository = new GenericRepository(Categoria);
        this.categoriaRepository = new CategoriaRepository();
    }

    async listarTodos({
        page = 1,
        limit = 10,
        sort = {}
    } = {})
    {
        const categorias = await this.repository.findAll({ page, limit, sort });
        return {
            ...categorias,
            data: categorias.data.map(categoria => CategoriaDTO.fromModel(categoria))
        }
    }

    async obterPorId(id)
    {
        const categoria = await this.repository.findById(id);
        if (!categoria) return null;
        return CategoriaDTO.fromModel(categoria);
    }

    async create(data)
    {
        const categoriaCriada = await this.repository.create(data);
        return CategoriaDTO.fromModel(categoriaCriada);
    }

    async update(id, data)
    {
        const categoria = await this.repository.findById(id);
        if (!categoria) return null;

        const categoriaAtualizada = await this.repository.update(id, data);
        return CategoriaDTO.fromModel(categoriaAtualizada);
    }

    async delete(id)
    {
        const categoria = await this.repository.findById(id);
        if (!categoria) return null;

        await Produto.updateMany(
            { categorias: id },
            { $pull: { categorias: id } }
        );

        return await this.repository.delete(id);
    }

    async listarComQuantidadeDeProdutos()
    {
        const categorias = await this.categoriaRepository.getCategoriasComQuantidadeDeProdutos();
        return categorias;
    }
}

module.exports = CategoriaService;