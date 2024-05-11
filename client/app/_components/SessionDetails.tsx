import { GetUserSessionDetails } from "../_serveractions/GetUserSessionDetails"

export default async function SessionDetails() {
    const sessionData = await GetUserSessionDetails()
    return <code>{JSON.stringify(sessionData)}</code>
}