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

    A API se integra com o front-end mencionado acima, que também precisa estar em execução para a aplicação completa funcionar.
