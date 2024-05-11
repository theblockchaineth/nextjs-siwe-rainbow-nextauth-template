# nextjs-siwe-rainbow-nextauth-template

Boilerplate for Web 3 applications with NextAuth and SIWE integration for
session based authentication and off-chain operations (wallet as IDP)

## Getting Started

```mermaid
graph TB
0[Clone Repo] -- dev only--> 3c[Copy .env.example to new .env file]
3c --> 3
1[Create Vercel Account targeting repo as Source] -- copy .env.example when defining Env Variables in Vercel--> 2[Standup a Vercel PostgresDB]
2b[Use a local PostgresSQL Instance] -- dev --> 3[Update client/.env locally with database details]
2[Standup Vercel PostgresDB] -- dev --> 3[Update client/.env locally with database details]
2[Standup Vercel PostgresDB] -- test/prod--> 4[Connect to Vercel App Auto Add ENV for DB]

3 --> 5[Run database migrations in client/db/output]
4 --> 5[Run database migrations in client/db/output]
5 --> 6[Add WalletConnect & Alchemy API keys to .env]
6 --> 7[Add a NextAuth Secret - suggest using `openssl rand -base64 32`]
7 --> 8[cd ./client]
8 --> 9[npm install]
9 -- dev --> 10[npm run dev]
9 -- test / prod --> 11[Create Pipelines in Vercel]
11 --> 12[Trigger Build]
```
