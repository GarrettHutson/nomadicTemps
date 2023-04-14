

import React from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import Image from 'next/image';

type Props = {}

async function JobCard({ }: Props) {

  const allJobs = await prisma.jobs.findMany()
  await prisma.$disconnect();
  return (
    <>
      {
        allJobs.map((job, i) => (
          <div key={i} className='border-black border-2 min-w-48 h-fit p-4 rounded-lg flex flex-col gap-4 '>
            <div >{job.title}</div>
            <div>{job.email}</div>
            <div>{job.description}</div>
          
           <div className='flex w-full'>
           <Image
              src={`data:image/jpeg;base64,${job.img}`}
              className='rounded-xl'
              width={150}
              height={150}
              alt="Picture of the author"
            />
            <div className='ml-8'>
       <div>{job.location}</div>
       <div>{job.Budget}</div>
            </div>

           </div>
     

          </div>
        ))
      }
    </>



  )
}



// import JobCard from '../components/JobCard'

// type Props = {}
// function page({ }: Props) {


//   return (
//  <div className='h-[80%] w-full flex overflow-auto justify-center mt-48 gap-2'>
// <JobCard />
//  </div>

//   )
// }

// export default page