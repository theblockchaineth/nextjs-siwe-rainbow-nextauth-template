'use server'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth-options'

export async function GetUserSessionDetails() {
  const session = await getServerSession(authOptions)
  return session
}
