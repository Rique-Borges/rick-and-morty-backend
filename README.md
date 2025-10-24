# Backend --- Rick & Morty App

Backend simples em **NestJS** com **Prisma** e **SQLite**, feito para o
app Rick & Morty.

## Estrutura

-   **Entrada:** `src/main.ts`\
-   **Módulo principal:** `src/app.module.ts`\
-   **Banco (Prisma):** `prisma/schema.prisma`\
-   **Módulos:** `auth`, `characters`, `prisma`

## Requisitos

-   Node.js ≥ 18\
-   npm\
-   (Opcional) npx para o Prisma CLI

## Configuração

1.  Instale dependências:

    ``` bash
    npm install
    ```

2.  Crie `.env`:

    ``` env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="uma-senha-secreta"
    ```

## Banco de Dados

``` bash
npx prisma generate      # gera o client
npx prisma migrate dev   # aplica migrações
npx prisma studio        # abre o painel
```

## Execução

``` bash
npm run start:dev    # modo desenvolvimento
npm run build && npm run start:prod  # produção
```

## Dicas

-   Atualize o `JWT_SECRET` para ativar o login.\
-   Após mudar o schema, rode `npx prisma generate`.\
-   Altere `DATABASE_URL` se quiser outro banco.
