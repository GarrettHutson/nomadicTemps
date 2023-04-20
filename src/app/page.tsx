'use client'
import Link from 'next/link'
import {  useUser } from "@clerk/nextjs";
export const revalidate = 0
export default function Home() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const {  isSignedIn, user } = useUser();

let newRes : object;
  async function createUser(){
   const res = await fetch('/api/user',{
      method: 'POST',
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.fullName,
        email:user.emailAddresses[0].emailAddress
     
  
      })
    })
     newRes = await res.json()
    return
  }
if(isSignedIn){
 createUser()
}

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



