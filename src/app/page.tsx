'use client'
import Link from 'next/link'

import { useUser } from "@clerk/nextjs";
import { useGlobalContext } from './context/store';
export const revalidate = 0
export default function Home() {
  const { setUserId } = useGlobalContext();

  const { isSignedIn, user } = useUser();


  let newRes: object;
  async function createUser() {
    const res = await fetch('/api/user', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.fullName,
        email: user.emailAddresses[0].emailAddress
      })
    })
    const newRes = await res.json()

  
    // Assuming that newRes contains the user id in 'id' field
    if (newRes.id) {
      setUserId(newRes.id); // Store the user id globally
    }
  }
  if (isSignedIn) {
    createUser()
  }

  return (
    <>
      <div className='h-screen w-screen flex gap-2 align-middle items-center justify-center'>
        <div className='text-black no-underline border-black border-2 w-fit p-2 h-fit rounded hover:bg-black hover:text-white'><Link href='jobs'>Jobs</Link></div>
        <div className='text-black no-underline border-black border-2 w-fit p-2 h-fit rounded hover:bg-black hover:text-white'><Link href='post'>CREATE LISTING</Link></div>
        <div className='text-black no-underline border-black border-2 w-fit p-2 h-fit rounded hover:bg-black hover:text-white'><Link href='my-jobs'>MY-JOBS</Link></div>

      </div>
    </>

  )

}



