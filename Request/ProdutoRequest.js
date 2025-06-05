const Joi = require('joi');
const GenericRepository = require('../Repository/GenericRepository');
const Produto = require('../Models/ProdutoModel');

class ProdutoRequest
{
    constructor()
    {
        this.repository = new GenericRepository(Produto);
    }

    JoiValidation()
    {
        return Joi.object({
            nome: Joi.string().required().messages({
                'any.required': 'O campo "Nome" é obrigatório!',
                'string.empty': 'O campo "Nome" é obrigatório!',
                'string.base': 'Valor do campo "Nome" inválido!'
            }),
            descricao: Joi.string().optional().allow(null, '').messages({
                'string.base': 'Valor do campo "Descrição" inválido!'
            }),
            quantidade: Joi.number().positive().required().messages({
                'any.required': 'O campo "Quantidade" é obrigatório!',
                'number.base': 'Valor do campo "Quantidade" inválido!',
                'number.positive': 'O campo "Quantidade" deve ser um número inteiro positivo!'
            }),
            preco: Joi.number().positive().precision(2).required().messages({
                'any.required': 'O campo "Preço" é obrigatório!',
                'number.base': 'Valor do campo "Preço" inválido!',
                'number.positive': 'O campo "Preço" deve ser um número decimal positivo!',
                'number.precision': 'O campo "Preço" deve conter no máximo 2 casas decimais!'
            }),
            categorias: Joi.array().items(
                Joi.string().messages({
                    'string.base': 'Valor do campo "Categorias" inválido!'
                })
            ).optional().allow(null, '').messages({
                'array.base': 'Valor do campo "Categorias" inválido!'
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

module.exports = ProdutoRequest;