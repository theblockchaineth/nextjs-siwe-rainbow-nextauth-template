import SessionDetails from "@/app/_components/SessionDetails";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex h-screen flex-col items-center justify-between">
            <div className="m-auto items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32">
                <SessionDetails />
                <br />
                <Link href={"/"} className="my-8 btn"> RETURN TO HOME</Link>
            </div>
        </div>
    )

}