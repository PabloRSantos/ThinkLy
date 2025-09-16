
# Documentação do Projeto Mobile

## 1. Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS (NativeWind)](https://www.nativewind.dev/)
- [Gluestack UI](https://ui.gluestack.io/)
- [ESLint](https://eslint.org/)
- [class-validator](https://github.com/typestack/class-validator)

## 2. Estrutura do Projeto

```
mobile/
├── app/                # Rotas e telas principais
│   ├── (app)/          # Telas autenticadas (home, profile, insights)
│   └── (auth)/         # Telas de autenticação (sign-in, sign-up)
├── assets/             # Imagens e SVGs
├── class-validator/    # Decorators de validação
├── components/         # Componentes reutilizáveis (UI)
├── config/             # Configurações globais (API, UI)
├── models/             # Modelos de dados (user, insight, topic)
├── services/           # Serviços de integração com API
├── stores/             # Gerenciamento de estado (auth)
├── .env.example        # Exemplo de variáveis de ambiente
├── README.md           # Documentação do projeto
└── ...                 # Outros arquivos de configuração
```

## 3. Como Rodar o Projeto

1. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
2. Altere o valor de `EXPO_PUBLIC_API_URL` no arquivo `.env` para o seu endereço IPv4 local.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o projeto:
   ```bash
   npm start
   ```
Obs: A aplicação foi testada apenas em dispositivos Android.

