const UsuarioService = require('../Service/UsuarioService');
const UsuarioRequest = require('../Request/UsuarioRequest');

class UsuarioController
{
    constructor()
    {
        this.service = new UsuarioService();
        this.request = new UsuarioRequest();

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async get(req, res)
    {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortField = req.query.sortField || 'createdAt';
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

            const sort = { [sortField]: sortOrder };

            const usuarios = await this.service.listarTodos({ page, limit, sort });
            return res.json(usuarios);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message });
        }
    }

    async getById(req, res)
    {
        try {
            const usuario = await this.service.obterPorId(req.params.id);
            if (!usuario) return null;

            return res.json(usuario);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao buscar usuario', error: err.message });
        }
    }

    async create(req, res)
    {
        try {
            const { valid, errors } = await this.request.validate(req.body, req.params.id);
            if (!valid) return res.status(422).json(errors);

            const usuario = await this.service.create(req.body);
            return res.status(201).json(usuario);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
        }
    }

    async update(req, res)
    {
        try {
            const { valid, errors } = await this.request.validate(req.body, req.params.id);
            if (!valid) return res.status(422).json(errors);

            const usuario = await this.service.update(req.params.id, req.body);
            if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

            return res.status(200).json(usuario);
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
        }
    }

    async delete(req, res)
    {
        try {
            const deleted = await this.service.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado' });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
        }
    }
}

module.exports = UsuarioController;