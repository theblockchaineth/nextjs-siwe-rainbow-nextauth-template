import type { Metadata } from 'next'
import { Providers } from "@/app/_web3/Providers";

import { Special_Elite } from 'next/font/google'
import './globals.css'
import "@rainbow-me/rainbowkit/styles.css";

const special_elite_font = Special_Elite({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: 'theblockchain.eth || boilerplate',
  description: 'Simple example of NextAuth with SIWE',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='business'>
      <body className={special_elite_font.className}>
        <Providers>{children}</Providers></body>
    </html>
  )
}
