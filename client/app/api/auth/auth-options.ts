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
