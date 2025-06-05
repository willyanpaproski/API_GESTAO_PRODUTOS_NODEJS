const Usuario = require('../Models/UsuarioModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthRequest = require('../Request/AuthRequest');

class AuthController
{
    constructor()
    {
        this.login = this.login.bind(this);
        this.request = new AuthRequest();
    }

    async login(req, res)
    {
        const { valid, errors } = this.request.validation(req.body);
        if (!valid) return res.status(422).json(errors);
        
        const { userName, password } = req.body;

        if (!userName || !password) return res.status(400).json({ message: 'Usuário e senha são obrigatórios!' });

        try {
            const usuario = await Usuario.findOne({
                userName: userName
            });

            if (!usuario) return res.status(401).json({ message: 'Credenciais inválidas!' });

            const isMatch = await usuario.comparePassword(password);
            if (!isMatch) return res.status(401).json({ message: 'Credenciais inválidas!' });

            const token = jwt.sign(
                {
                    id: usuario._id,
                    userName: usuario.userName
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return res.json({ 
                token: token, 
                userName: usuario.userName
            });
        } catch (err) {
            return res.status(500).json({ message: 'Erro no login', error: err.message });
        }
    }
}

module.exports = AuthController;