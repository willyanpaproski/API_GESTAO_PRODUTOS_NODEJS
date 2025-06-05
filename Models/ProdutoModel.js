const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String
    },
    quantidade: {
        type: Number,
        required: true
    },
    preco: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    categorias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }]
}, { timestamps: true });

const Produto = mongoose.model('Produto', ProdutoSchema);
module.exports = Produto;