import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <pre>{JSON.stringify(session, undefined, 1)}</pre>
    </main>
  )
}
