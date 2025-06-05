const Joi = require('joi');
const GenericRepository = require('../Repository/GenericRepository');
const Categoria = require('../Models/CategoriaModel');

class CategoriaRequest
{
    constructor()
    {
        this.repository = new GenericRepository(Categoria);
    }

    JoinValidation()
    {
        return Joi.object({
            nome: Joi.string().required().messages({
                'any.required': 'O valor do campo "Nome" é obrigatório!',
                'string.empty': 'O valor do campo "Nome" é obrigatório!',
                'string.base': 'Valor do campo "Nome" inválido!'
            }),
            descricao: Joi.string().optional().allow(null, '').messages({
                'string.base': 'Valor do campo "Descrição" inválido!'
            })
        });
    }

    async validate(data, id = null)
    {
        const schema = this.JoinValidation();
        const { error } = schema.validate(data, { abortEarly: false });

        if (error)
        {
            return {
                valid: false,
                errors: error.details.map(e => e.message)
            }
        }

        const nomeExist = await this.repository.findOne({
            nome: data.nome,
            ...(id ? { _id: { $ne: id } } : {})
        });
        if (nomeExist)
        {
            return {
                valid: false,
                errors: ['O nome informado já está em uso!']
            }
        }

        return { valid: true }
    }
}

module.exports = CategoriaRequest;