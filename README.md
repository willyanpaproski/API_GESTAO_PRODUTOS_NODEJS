📦 API de Gestão de Produtos – Backend

Esta é uma API desenvolvida com Node.js que integra com a aplicação front-end disponível no repositório:
🔗 https://github.com/willyanpaproski/API_GESTAO_PRODUTOS_FRONT_END

✅ Requisitos

Antes de iniciar o projeto, certifique-se de que os seguintes itens estão instalados:

    Node.js (versão 18 ou superior)

    npm (gerenciador de pacotes do Node.js)

    MongoDB (local ou via MongoDB Atlas)

🚀 Como rodar o projeto

Clone o repositório (se ainda não o fez):

    git clone https://github.com/willyanpaproski/API_GESTAO_PRODUTOS_BACK_END.git

    cd API_GESTAO_PRODUTOS_BACK_END

Crie o arquivo .env na raiz do projeto, com base no .env.example, preenchendo as seguintes variáveis:

    PORT: Porta onde a API será executada

    MONGO_URI: URL de conexão com o MongoDB

    JWT_SECRET: Uma chave secreta segura para geração dos tokens JWT

    SALT_ROUNDS: Número de "rounds" para criptografia de senhas com bcrypt

Instale as dependências:

    npm install

Inicie a API:

    node server.js

💡 Observações

    Após iniciar a API, ela estará disponível na URL http://localhost:<PORT> (substitua <PORT> pela porta configurada no .env).

    A API se integra com o front-end mencionado acima.

Rotas da API:

Usuários:

    GET -> /api/usuario -> Consulta todos os usuários cadastrados
    GET -> /api/usuario/:id -> Consulta um usuário por meio do seu ID
    POST -> /api/usuario -> Cadastra um usuário (Não precisa de token)
    PUT -> /api/usuario/:id -> Busca um usuário pelo seu ID e atualiza seus dados
    DELETE -> /api/usuario/:id -> Busca um usuário pelo seu ID e o deleta do banco de dados

Categorias:

    GET -> /api/categoria -> Consulta todas as categorias cadastradas
    GET -> /api/categoria/quantidadeProdutos -> Consulta todas as categorias com a quantidade de produtos vinculados a cada uma
    GET -> /api/categoria/:id -> Consulta uma categoria pelo seu ID
    POST -> /api/categoria -> Cadastra uma categoria
    PUT -> /api/categoria/:id -> Busca uma categoria pelo seu ID e atualiza seus dados
    DELETE -> /api/categoria/:id -> Busca uma categoria pelo seu ID e a delete do banco de dados

Produtos:

    GET -> /api/produto -> Consulta todos os produtos cadastrados
    GET -> /api/produto/maiorQuantidade -> Consulta os 10 produtos com maior quantidade
    GET -> /api/produto/:categoriaId -> Consulta um produto por meio do ID da categoria a qual está vinculado
    GET -> /api/produto/:id -> Consulta um produto por meio do seu ID
    POST -> /api/produto -> Cadastra um produto
    PUT -> /api/produto/:id -> Busca um produto pelo ID e atualiza seus dados
    DELETE -> /api/produtos/:id -> Busca um produto pelo ID e o deleta do banco de dados

Autenticação:
    
    POST -> /api/auth/login -> Recebe as credenciais de um usuário para realizar login. Caso o login for bem sucedido, é retornado o token para utilizar para as demais rotas
