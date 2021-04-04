# API com MySQL, Node.js e Sequelize
API com autenticação para cadastro de cliente e produtos com imagens!

# Tecnologias
- Express — A web framework for Node.js
- Sequelize — SQL dialect ORM for Node.js

# Pré-requisitos
- Node.js
- Yarn

# Instalação e execução
Faça um clone desse repositório; <br/>
Entre na pasta cd API-NodeJS-Express-MySQL; <br/>
Rode yarn para instalar as dependências; <br/>
Altere as credencias do banco dentro de /src/config/database.js; <br/>
Rode yarn sequelize db:create para criar o banco de dados; <br/>
Rode yarn sequelize migration: create para criação das migrations; <br/>
Rode yarn sequelize db:migrate para executar as migrations; <br/>
Rode yarn start para iniciar o servidor.

# Licença
Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
