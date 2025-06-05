const Joi = require('joi');

class AuthRequest
{
    JoiValidation()
    {
        return Joi.object({
            userName: Joi.string().min(5).required().messages({
                'any.required': 'O campo "Username" é obrigatório!',
                'string.min': 'O valor do campo "Username" deve conter no mínimo 5 caracteres!',
                'string.empty': 'Valor do campo "Username" inválido!',
                'string.base': 'Valor do campo "Username" inválido!'
            }),
            password: Joi.string().min(8).required().messages({
                'any.required': 'O campo "Password" é obrigatório!',
                'string.min': 'O valor do campo "Password" deve conter no mínimo 8 caracteres!',
                'string.empty': 'Valor do campo "Password" inválido!',
                'string.base': 'Valor do campo "Password" inválido!'
            })
        });
    }

    validation(data)
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

        return { valid: true }
    }
}

module.exports = AuthRequest;