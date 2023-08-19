"use client";

import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";



import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



import { Button, buttonVariants } from "./ui/button";


interface ButtonProps {
  className: string
}

export const LoginButton = () => {
  return (
    <Link href={'/login'} className={buttonVariants({ variant: 'ghost' })}>
      Sign in
    </Link>
  )
}

export const GitHubLogin = ({ className }: ButtonProps) => {
  return (
    <Button onClick={(e: React.MouseEvent) => {
      e.preventDefault()
      signIn("github", { callbackUrl: "/" })
    }} className={`${className} ${buttonVariants({ variant: 'default' })}`}>
      Sign in with GitHub
    </Button>
  )
}

export const RegisterButton = () => {
  return (
    <Link href="/register" className={buttonVariants({ variant: "ghost" })}>
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}

export const ProfileButton = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
        Profile
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <p>{session?.user?.name}</p>
          <p className="font-normal">{session?.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={'/profile-server'} className="w-full">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}