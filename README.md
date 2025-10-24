  # Backend — Rick & Morty App

Pequeno backend em NestJS para o aplicativo demo do Rick & Morty (TypeScript, NestJS, Prisma).

## Pontos principais
- Ponto de entrada: `src/main.ts`
- Módulo principal: `src/app.module.ts`
- Schema do banco de dados: `prisma/schema.prisma` (Prisma + SQLite por padrão)
- Autenticação: `src/auth`
- Personagens: `src/characters`
- Serviço do Prisma: `src/prisma/prisma.service.ts`

## Pré-requisitos
- Node.js >= 18
- npm
- (Opcional) npx para executar o Prisma CLI

## Configuração (desenvolvimento local)
1. Instale as dependências
   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto com, no mínimo:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="uma-senha-secreta-forte"
   ```

## Banco de Dados (Prisma)
- Gerar o Prisma Client (execute após alterar o schema):
  ```bash
  npx prisma generate
  ```
- Aplicar migrações (cria o arquivo e o schema SQLite):
  ```bash
  npx prisma migrate deploy
  ```
  Para desenvolvimento iterativo, você pode executar:
  ```bash
  npx prisma migrate dev --name init
  ```
  Ou para aplicar o schema sem migrações:
  ```bash
  npx prisma db push
  ```

## Execução
- Desenvolvimento (modo watch):
  ```bash
  npm run start:dev
  ```
- Produção:
  ```bash
  npm run build
  npm run start:prod
  ```

## Comandos úteis
- Inspecionar o banco de dados com o Prisma Studio:
  ```bash
  npx prisma studio
  ```
- Recriar o banco (dev) e rodar as migrações novamente:
  ```bash
  npx prisma migrate reset
  ```

## Notas
- Certifique-se de que `JWT_SECRET` está configurado para que a autenticação funcione.
- Se alterar o arquivo `prisma/schema.prisma`, execute `npx prisma generate` e aplique as migrações.
- As rotas da API estão definidas nos controladores em `src/*` (ex: `src/characters`, `src/rm`, `src/auth`).
- O projeto utiliza SQLite por padrão; altere `DATABASE_URL` se quiser usar outro provedor.
