import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

import { insertUser, getUserByWallet } from '@/db/operations/templateuser'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))
          
          // This can be problematic when not local (i.e. TST/PRD)
          // I've experienced it working andnot working when setting the NEXTAUTH_URL manually in Env Variables
          // If you experience issues, you can...
          // 1. Manually override it and provide the string literal
          // 2. Use a case switch and a bit flag that feeds from a non-reserved variable when not local (i.e. DEV_MODE=0)
          // 3. Fiddle around with Vercel until it works
          
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string)

          const result = await siwe.verify({
            signature: credentials?.signature || '',
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req: { headers: req.headers } }),
          })

          if (result.success) {
            let UserRecord = await getUserByWallet(result.data.address || '')
            if (UserRecord.length < 1) {
              UserRecord = await insertUser({
                wallet: result.data.address,
              })
            }
            return {
              id: `eip155:${result.data.chainId}:${result.data.address}:${UserRecord[0].pid}`,
            }
          }
          return null
        } catch (e) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (!token.sub) {
        return session
      }

      session.sub = token.sub

      const [, chainId, address, userId] = token.sub.split(':')
      session.address = address
      session.chainId = chainId
      session.userId = userId
      return session
    },
  },
}
