const GenericRepository = require('../Repository/GenericRepository');
const Usuario = require('../Models/UsuarioModel');
const UsuarioDTO = require('../DTO/UsuarioDTO');

class UsuarioService
{
    constructor()
    {
        this.repository = new GenericRepository(Usuario);
    }

    async listarTodos({
        page = 1,
        limit = 10,
        sort = {}
    } = {})
    {
        const usuarios = await this.repository.findAll({ page, limit, sort });
        return {
            ...usuarios,
            data: usuarios.data.map(usuario => UsuarioDTO.fromModel(usuario))
        }
    }

    async obterPorId(id)
    {
        const usuario = await this.repository.findById(id);
        if (!usuario) return null;
        return UsuarioDTO.fromModel(usuario);
    }

    async create(data)
    {
        const usuarioCriado = await this.repository.create(data);
        return UsuarioDTO.fromModel(usuarioCriado);
    }

    async update(id, data)
    {
        const usuario = await this.repository.findById(id);
        if (!usuario) return null;

        const usuarioAtualizado = await this.repository.update(id, data);
        return UsuarioDTO.fromModel(usuarioAtualizado);
    }

    async delete(id)
    {
        const usuario = await this.repository.findById(id);
        if (!usuario) return null;
        
        return await this.repository.delete(id);
    }
}

module.exports = UsuarioService;