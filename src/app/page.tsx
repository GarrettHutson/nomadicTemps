'use client'
import Link from 'next/link'
import { SignedIn, SignIn, useUser, useAuth } from "@clerk/nextjs";

export default function Home() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

if(isSignedIn){
  fetch('/api/user',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.fullName,
      email:user.emailAddresses[0].emailAddress
   

    })
  })
}




  console.log(user)


  return (
    <>
        <div className='h-screen w-screen flex gap-2 align-middle items-center justify-center'>
  <div className='text-black no-underline border-black border-2 w-fit p-2 h-fit rounded hover:bg-black hover:text-white'><Link href='hello'>SAY HELLO</Link></div>
  <div className='text-black no-underline border-black border-2 w-fit p-2 h-fit rounded hover:bg-black hover:text-white'><Link href='jobs'>Jobs</Link></div>
  <div className='text-black no-underline border-black border-2 w-fit p-2 h-fit rounded hover:bg-black hover:text-white'><Link href='post'>CREATE LISTING</Link></div>

    </div>
    </>

      )

}



