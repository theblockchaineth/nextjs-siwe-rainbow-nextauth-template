"use client"

import Link from "next/link";
import { useAccount } from "wagmi";

export default function ConnectedOnlyLinkButton(props: any) {
    const { isConnected } = useAccount();

    if (!isConnected) return <p className="btn btn-disabled">{props.notconnectedtext}</p>

    return <Link href={props.href} className="btn">{props.connectedtext}</Link>
}
