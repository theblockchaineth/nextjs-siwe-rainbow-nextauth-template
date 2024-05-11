# NextJS 14.x (App Router) Template for Magma, Base & Ethereum Builders

## Includes: TailwindCSS, DaisyUI, Sign-in with Ethereum, NextAuth, wagmi.sh, DrizzleORM and RainbowKit Wallet Integration

### How does it all hang together?

We're essentailly using SIWE as an Identity Provider, wrapping standard SIWE
functionality in the NextAuth suite. This enables us to verify a user and
establish a session/JWT token for secure user operations in an off-chain
application. Super useful for gaming products or where you might want to token
gate a more Web 2.0 style site.

The site is designed to use the built in NextJS and NextAuth SSR flows and
validation, allowing you to protect pages and content by skimming the token from
cookies to ensure they are logged in. This can be extended to include balance
checks, tokens held, etc.

```mermaid
graph
0[Connect Wallet] --> 1[RainbowKit UI]
1 --> 2[RainbowKit SIWE Library]
2 --> 3[User SIWE Message Presented]
3 -- User Declines --> 5[Connection Rejected]
3 -- User Signs--> 4[NextAuth Session Flow]
4 --> 6[Authorize called & SIWE message validated]
6 -- Fails --> 7[Connection Rejected]
6 -- Passes --> 8[JWT & Session Generated]
8 -- Site operations --> 9[NextJS Server-side Validation of Session Token]
8 -- Wallet changes --> 10[Session Dropped]

```

### Directory Structure

client (whole app)

1. app (NextJS 14.x App Router Structure)
   1. \_components (common use react components)
   2. \_serveractions (server-sde server actions (API-esque))
   3. \_web3 (providers & configs for wagmi, tanstack, rainbow, nextauth)
   4. api (routes to APIs - only used for nextauth in the boilerplate)
   5. (routes) (a logical grouping via directory for routes)
2. db (DrizzleORM databse definition, operations, and migrations)
   1. operations (ORM-tied CRUD functions)
   2. output (migration scripts generated from npm run generate)
   3. schema (table defintions)
   4. types (typescript definitions in a single place)

### Getting Started

This is designed for Vercel Hosting, with Vercel PostgresDB. You can subsitute
the PostgresDB layer to local instances with ease or just rip out the
drizzle-ORM and use your own model.

The diagram looks nuts but essentially...

#### Vercel

1. Clone the repo
2. Stand it up on Vercel and attach a PostgresDB database
3. Run the client/db/output migration SQL against your db
4. Update the environment variables as needed in the App Settings
5. Configure the build based on a branch (i.e. main but develop in dev and PR to
   push changes to Vercel, etc)

#### Local

1. Clone the repo
2. Copy the .env.sample to a new .env
3. Fill in everything
   1. Get your Vercel PostgresDB details
   2. or, use a local instance if you have one (this is better so that vercel
      and local aren't sharing a schema/data)
4. Run the client/db/output migration SQL against your db
5. cd client
6. npm install
7. npm run dev
8. Configure the build based on a branch (i.e. main but develop in dev and PR to
   push changes to Vercel, etc)

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
