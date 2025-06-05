const ProdutoService = require('../Service/ProdutoService');
const ProdutoRequest = require('../Request/ProdutoRequest');

class ProdutoController
{
    constructor()
    {
        this.service = new ProdutoService();
        this.request = new ProdutoRequest();

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getProdutosComMaiorQuantidade = this.getProdutosComMaiorQuantidade.bind(this);
        this.getProdutoByCategoriaId = this.getProdutoByCategoriaId.bind(this);
    }

    async get(req, res)
    {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortField = req.query.sortField || 'createdAt';
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

            const sort = { [sortField]: sortOrder };

            const produtos = await this.service.listarTodos({ page, limit, sort });
            return res.json(produtos);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message });
        }
    }

    async getById(req, res)
    {
        try {
            const produto = await this.service.obterPorId(req.params.id);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

            return res.json(produto);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar produto', error: err.message });
        }
    }

    async create(req, res)
    {
        try {
            const { valid, errors } = await this.request.validate(req.body, req.params.id);
            if (!valid) return res.status(422).json(errors);

            const produto = await this.service.create(req.body);
            return res.status(201).json(produto);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao cadastrar produto', error: err.message });
        }
    }

    async update(req, res)
    {
        try {
            const { valid, errors } = await this.request.validate(req.body, req.params.id);
            if (!valid) return res.status(422).json(errors);

            const produto = await this.service.update(req.params.id, req.body);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

            return res.status(200).json(produto);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message });
        }
    }

    async delete(req, res)
    {
        try {
            const deleted = await this.service.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Produto não encontrado' });

            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao deletar produto', error: err.message });
        }
    }

    async getProdutosComMaiorQuantidade(req, res)
    {
        try {
            const produtos = await this.service.listarProdutosComMaiorQuantidade();
            return res.json(produtos);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message });
        }
    }

    async getProdutoByCategoriaId(req, res)
    {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortField = req.query.sortField || 'createdAt';
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

            const sort = { [sortField]: sortOrder }

            const produtos = await this.service.obterProdutoByCategoriaId(req.params.categoriaId, { page, limit, sort });
            return res.json(produtos);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar produtos', error: err.message });
        }
    }
}

module.exports = ProdutoController;