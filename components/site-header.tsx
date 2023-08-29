"use client"

import { useSession } from "next-auth/react"

import { MainNav } from "@/components/main-nav"
import { siteConfig } from "@/config/site"

import {
    LoginButton,
    ProfileButton,
    RegisterButton
} from "./buttons.component"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {session ? (
              <>
                <ProfileButton session={session} />
              </>
            ) : (
              <>
                <LoginButton />
                <RegisterButton />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
