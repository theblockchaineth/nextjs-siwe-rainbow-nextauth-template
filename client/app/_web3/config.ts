import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { cookieStorage, createStorage } from 'wagmi'
import { chains } from './networks'

export const config = getDefaultConfig({
  appName: 'theblockchain.eth || boilerplate',
  projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
  chains: chains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
