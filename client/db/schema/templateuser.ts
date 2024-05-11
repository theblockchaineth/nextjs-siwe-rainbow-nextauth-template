import { pgTable, serial, varchar, timestamp, index } from 'drizzle-orm/pg-core'

export const templateuser = pgTable(
  'templateuser',
  {
    pid: serial('pid').primaryKey().notNull(),
    wallet: varchar('wallet', { length: 64 }).notNull(),
    created: timestamp('created').defaultNow().notNull(),
  },
  templateuser => {
    return {
      walletIndex: index('templateuser_wallet_idx').on(templateuser.wallet),
    }
  },
)

export type User = typeof templateuser.$inferSelect
export type NewUser = typeof templateuser.$inferInsert
