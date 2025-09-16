# Documentação do Backend

## 1. Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [OpenWeather API](https://openweathermap.org/api)
- [HuggingFace API](https://huggingface.co/docs/api-inference/index)

## 2. Estrutura do Projeto

- **`prisma/`**: Esquema e migrações do banco de dados.
- **`src/common/`**: Utilitários compartilhados (conexão com banco, decorators, guards, middlewares).
- **`src/modules/auth/`**: Lógica de autenticação, modelos de domínio, repositórios, casos de uso.
- **`src/modules/insights/`**: Lógica de insights e tópicos, modelos de domínio, repositórios, casos de uso.
- **`docker-compose.yaml`**: Orquestra os containers da aplicação e banco de dados.
- **`Dockerfile`**: Definição da imagem Docker.
- **`.env.example`**: Exemplo de variáveis de ambiente.

## 3. Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone <repo-url>
   cd backend
   ```

2. **Copie o arquivo de variáveis de ambiente:**

   ```bash
   cp .env.example .env
   ```

3. **Preencha as API_KEYS:**
   - **HUGGINGFACE_API_KEY:** Gere sua chave em [HuggingFace - Access Tokens](https://huggingface.co/settings/tokens)
   - **WEATHER_API_KEY:** Gere sua chave em [OpenWeather - API Keys](https://home.openweathermap.org/api_keys)

4. **Inicie a aplicação e o banco de dados usando Docker Compose:**

   ```bash
   docker-compose up
   ```

5. **Acesse a API:**
   - A API estará disponível em [http://localhost:3000](http://localhost:3000) por padrão.
   - Documentação Swagger disponível em [http://localhost:3000/api](http://localhost:3000/api).

6. **Banco de Dados:**
   - O PostgreSQL roda na porta `5432`.
   - Usuário padrão: `postgres`
   - Senha padrão: `postgres`


