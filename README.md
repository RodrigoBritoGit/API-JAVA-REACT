# Sistema de Gerenciamento de Produtos
Este é um sistema de gerenciamento de produtos que consiste em uma API backend desenvolvida em Java Spring Boot e um frontend em React que consome essa API.

# Instalação
## Requisitos Prévios
Java JDK 11 ou superior instalado
Node.js e npm instalados
Git instalado

# Backend (API)
1. Clone este repositório:
   git clone https://github.com/seu-usuario/sistema-produtos.git
2. Navegue até o diretório do backend:
   cd {caminho_diretorio}
3. Execute a aplicação Spring Boot:
   ./mvnw spring-boot:run
4. O backend estará rodando em http://localhost:8080.

# Frontend (React)

1. Navegue até o diretório do frontend:
   cd ../frontend
2. Instale as dependências do projeto:
   npm install
3. Inicie o servidor de desenvolvimento:
   npm start
4. O frontend estará disponível em http://localhost:3000.

# Uso

Após iniciar tanto o backend quanto o frontend, você pode acessar a aplicação em seu navegador em http://localhost:3000. O frontend permite realizar operações CRUD (Criar, Ler, Atualizar, Deletar) em produtos, consumindo a API fornecida pelo backend.

# Funcionalidades

1. Listar Produtos: Exibe uma lista de todos os produtos cadastrados.
2. Adicionar Produto: Permite adicionar um novo produto ao sistema.
3. Editar Produto: Permite editar as informações de um produto existente.
4. Remover Produto: Permite excluir um produto do sistema.
