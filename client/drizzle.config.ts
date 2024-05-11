import type { Config } from 'drizzle-kit'
export default {
  dialect: 'postgresql',
  schema: './db/schema/*.ts',
  out: './db/output',
} satisfies Config
