# Esta é uma API nodejs que integra com a aplicação front-end encontrada no link https://github.com/willyanpaproski/API_GESTAO_PRODUTOS_FRONT_END

Abaixo, seguem os passos e requisitos para rodar a aplicação:

1. Primeiro, é necessário ter o mongodb instalado na máquina onde a aplicação irá rodar, ou utilizar o mongodb atlas.

3. Crie o arquivo com o nome ".env" e preencha as variáveis de acordo com o arquivo ".env.example". As variáveis necessárias para a api, é a porta onde a api irá rodar, a url de conexão com o banco de dados mongodb, uma senha segura para tokens jwt, e um número para o "salt_rounds", que é utilizado pela api para criptografar senhas.

4. Após criado o arquivo ".env", rode o comando "node server.js" na raíz do projeto. Logo que a aplicação inicia, ela tenta realizar conexão com o banco de dados, e trará no console se a conexão foi realizada com sucesso
