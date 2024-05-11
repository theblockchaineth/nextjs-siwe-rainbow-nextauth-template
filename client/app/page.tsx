import RainbowConnect from "./_components/RainbowConnect"
import ConnectedOnlyLinkButton from "./_components/ConnectedOnlyLinkButton"

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-between'>
      <div className="m-auto items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32">
        <h1 className="text-2xl font-bold">theblockchain.eth || boilerplate
        </h1>
        <p className="px-8 mt-8 mb-12 text-lg">NextJS 14.x, NextAuth, SIWE, Rainbowkit, DrizzleORM, wagmi, tanstack, TailwindCSS, DaisyUI</p>
        <div
          className="flex w-full items-center justify-center text-center"
          role="img"
        >
          <RainbowConnect />
        </div>
        <div className="my-8">
          <ConnectedOnlyLinkButton href={"/user"} connectedtext={"View User Token Page"} notconnectedtext={"Disabled - Not Logged In..."} />
        </div>
      </div>
    </main>
  )
}
