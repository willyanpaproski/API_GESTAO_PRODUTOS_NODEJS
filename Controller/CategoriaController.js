const CategoriaService = require('../Service/CategoriaService');
const CategoriaRequest = require('../Request/CategoriaRequest');

class CategoriaController
{
    constructor()
    {
        this.service = new CategoriaService();
        this.request = new CategoriaRequest();

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getCategoriasComQuantidadeDeProdutos = this.getCategoriasComQuantidadeDeProdutos.bind(this);
    }

    async get(req, res)
    {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortField = req.query.sortField || 'createdAt';
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

            const sort = { [sortField]: sortOrder };

            const categorias = await this.service.listarTodos({ page, limit, sort });
            return res.json(categorias);
        } catch (err) {
            res.status(500).json({ message: 'Erro ao buscar categorias', error: err.message });
        }
    }

    async getById(req, res)
    {
        try {
            const categoria = await this.service.obterPorId(req.params.id);
            if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

            return res.json(categoria);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar categoria', error: err.message });
        }
    }

    async create(req, res)
    {
        try {
            const { valid, errors } = await this.request.validate(req.body, req.params.id);
            if (!valid) return res.status(422).json(errors);

            const categoria = await this.service.create(req.body);
            return res.status(201).json(categoria);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao cadastrar categoria', error: err.message });
        }
    }

    async update(req, res)
    {
        try {
            const { valid, errors } = await this.request.validate(req.body, req.params.id);
            if (!valid) return res.status(422).json(errors);

            const categoria = await this.service.update(req.params.id, req.body);
            if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });

            return res.status(200).json(categoria);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao atualizar categoria', error: err.message });
        }
    }

    async delete(req, res)
    {
        try {
            const deleted = await this.service.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Categoria não encontrada' });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ mesage: 'Erro ao deletar categoria', error: err.message });
        }
    }

    async getCategoriasComQuantidadeDeProdutos(req, res)
    {
        try {
            const categorias = await this.service.listarComQuantidadeDeProdutos();
            return res.json(categorias);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar categorias', error: err.message });
        }
    }
}

module.exports = CategoriaController;