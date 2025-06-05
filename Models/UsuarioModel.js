const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS;

const UsuarioSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    }
}, { timestamps: true });

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const bcryptSalt = await bcrypt.genSalt(parseInt(saltRounds));
        this.password = await bcrypt.hash(this.password, bcryptSalt);
        next();
    } catch (error) {
        next(error);
    }
});

UsuarioSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;