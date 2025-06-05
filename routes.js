const authMiddleware = require('./Middleware/AuthMiddleware');
const ProdutoController = new (require('./Controller/ProdutoController'));
const UsuarioController = new (require('./Controller/UsuarioController'));
const CategoriaController = new (require('./Controller/CategoriaController'));
const AuthController = new (require('./Controller/AuthController'));

const Router = require('express').Router;
const router = Router();

//Rota para login
router.post('/auth/login', AuthController.login);

//Rotas referente a usuários
router.get('/usuario', authMiddleware, UsuarioController.get);
router.get('/usuario/:id', authMiddleware, UsuarioController.getById);
router.post('/usuario', UsuarioController.create);
router.put('/usuario/:id', authMiddleware, UsuarioController.update);
router.delete('/usuario/:id', authMiddleware, UsuarioController.delete);

//Rotas referente a categorias
router.get('/categoria', authMiddleware, CategoriaController.get);
router.get('/categoria/quantidadeProdutos', authMiddleware, CategoriaController.getCategoriasComQuantidadeDeProdutos);
router.get('/categoria/:id', authMiddleware, CategoriaController.getById);
router.post('/categoria', authMiddleware, CategoriaController.create);
router.put('/categoria/:id', authMiddleware, CategoriaController.update);
router.delete('/categoria/:id', authMiddleware, CategoriaController.delete);

//Rotas referente a produtos
router.get('/produto', authMiddleware, ProdutoController.get);
router.get('/produto/maiorquantidade', authMiddleware, ProdutoController.getProdutosComMaiorQuantidade);
router.get('/produto/:id', authMiddleware, ProdutoController.getById);
router.get('/produto/categoria/:categoriaId', authMiddleware, ProdutoController.getProdutoByCategoriaId);
router.post('/produto', authMiddleware, ProdutoController.create);
router.put('/produto/:id', authMiddleware, ProdutoController.update);
router.delete('/produto/:id', authMiddleware, ProdutoController.delete);

module.exports = router;