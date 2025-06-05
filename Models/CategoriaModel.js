const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String
    }
}, { timestamps: true });

const Categoria = mongoose.model('Categoria', CategoriaSchema);
module.exports = Categoria;