const Joi = require('joi');
const GenericRepository = require('../Repository/GenericRepository');
const Usuario = require('../Models/UsuarioModel');

class UsuarioRequest
{
    constructor()
    {
        this.repository = new GenericRepository(Usuario);
    }

    JoiValidation()
    {
        return Joi.object({
            userName: Joi.string().min(5).required().messages({
                'any.required': 'O campo "Username" é obrigatório!',
                'string.empty': 'O campo "Username" é obrigatório!',
                'string.min': 'O campo "Username" deve conter no mínimo 5 caracteres!',
                'string.base': 'Valor do campo "Username" inválido!'
            }),
            password: Joi.string().min(8).required().messages({
                'any.required': 'O campo "Password" é obrigatório!',
                'string.empty': 'O campo "Password" é obrigatório!',
                'string.min': 'O valor do campo "Password" deve conter no mínimo 8 caracteres!',
                'string.base': 'Valor do campo "Password" inválido!'
            })
        });
    }

    async validate(data, id = null)
    {
        const schema = this.JoiValidation();
        const { error } = schema.validate(data, { abortEarly: false });

        if (error)
        {
            return {
                valid: false,
                errors: error.details.map(e => e.message)
            }
        }

        const userNameExist = await this.repository.findOne({
            userName: data.userName,
            ...(id ? { _id: { $ne: id } } : {})
        });
        if (userNameExist)
        {
            return {
                valid: false,
                errors: ['O username informado já está em uso!']
            }
        }

        return { valid: true }
    }
}

module.exports = UsuarioRequest;