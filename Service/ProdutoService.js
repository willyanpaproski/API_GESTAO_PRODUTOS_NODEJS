const GenericRepository = require('../Repository/GenericRepository');
const Produto = require('../Models/ProdutoModel');
const ProdutoDTO = require('../DTO/ProdutoDTO');
const ProdutoRepository = require('../Repository/ProdutoRepository');

class ProdutoService
{
    constructor()
    {
        this.repository = new GenericRepository(Produto);
        this.produtoRepository = new ProdutoRepository();
    }

    async listarTodos({
        page = 1,
        limit = 10,
        sort = {}
    } = {})
    {
        const produtos = await this.repository.findAll({ page, limit, sort });
        return {
            ...produtos,
            data: produtos.data.map(produto => ProdutoDTO.fromModel(produto))
        }
    }

    async obterPorId(id)
    {
        const produto = await this.repository.findById(id);
        if (!produto) return null;

        return ProdutoDTO.fromModel(produto);
    }

    async create(data)
    {
        const produtoCriado = await this.repository.create(data);
        return ProdutoDTO.fromModel(produtoCriado);
    }

    async update(id, data)
    {
        const produto = await this.repository.findById(id);
        if (!produto) return null;

        const produtoAtualizado = await this.repository.update(id, data);
        return ProdutoDTO.fromModel(produtoAtualizado);
    }

    async delete(id)
    {
        const produto = await this.repository.findById(id);
        if (!produto) return null;

        return await this.repository.delete(id);
    }

    async listarProdutosComMaiorQuantidade()
    {
        const produtos = await this.produtoRepository.findProdutosComMaiorQuantidade();
        return {
            data: produtos.map(produto => ProdutoDTO.fromModel(produto))
        }
    }

    async obterProdutoByCategoriaId(
        categoriaId,
        {
            page = 1,
            limit = 10,
            sort = {}
        } = {}
    )
    {
        const produtos = await this.produtoRepository.findProdutoByCategoriaId(categoriaId, { page, limit, sort });
        return {
            ...produtos,
            data: produtos.data.map(produto => ProdutoDTO.fromModel(produto))
        }
    }
}

module.exports = ProdutoService;