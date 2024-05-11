import { db } from '../connect'
import { templateuser } from '@/db/schema/templateuser'
import { eq } from 'drizzle-orm'
import type { NewUser, User } from '../types'

export async function insertUser(newUser: NewUser): Promise<User[]> {
  return db.insert(templateuser).values(newUser).returning()
}

export async function getUserByWallet(userWallet: string): Promise<User[]> {
  return db
    .select()
    .from(templateuser)
    .where(eq(templateuser.wallet, userWallet))
}

export async function getUserById(userId: number): Promise<User[]> {
  return db.select().from(templateuser).where(eq(templateuser.pid, userId))
}
