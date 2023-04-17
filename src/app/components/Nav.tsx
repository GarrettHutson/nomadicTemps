'use client'
import Link from "next/link"
import { UserButton } from "@clerk/clerk-react";
import { SignedIn, SignIn, useUser, useAuth } from "@clerk/nextjs";

type Props = {}

export default function Nav({}: Props) {

  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(isSignedIn)
  return (
    <div className="flex items-center">
   <UserButton /> 
   <div className="mx-auto mt-4 mb-8 text-center text-4xl font-light w-full h-8 ">
    <Link href='/'>surely + work</Link>
    </div>
    </div>
  )
}

