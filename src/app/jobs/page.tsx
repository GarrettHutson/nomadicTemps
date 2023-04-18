'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import DeleteButton from '../components/DeleteButton';

export default function Page() {
const [allJobs, setAllJobs] = useState(null)

async function getJobs(){
 const res = await fetch('/api/jobs', {cache: 'no-store'})
 const newRes = await res.json();
 console.log(newRes,'from jobs front end')
 setAllJobs(newRes.allJobs)
}


getJobs()



  if(allJobs === null)return <div>Loading all Jobs....</div>
  return (
    <div className='flex flex-col items-center align-middle justify-center gap-4'>
      {
        allJobs.map((job, i) =>{
          return (
   
                 <div key={i} className=' pb-24 flex flex-col border-2 w-2/5 h-full  justify-center border-black border-opacity-40 op'>
                <Image
                    className='pb-36'
                    src='/.././public/image.png'
                    alt='something'
                    width={500}

                    height={300} />
                <div>
                    <p className='text-md m-2'>{job.email === '' ? 'https://exampleEmail.com' : job.email}</p>
                    <h1 className='text-2xl m-2'>{job.title === '' ? 'TitleExample' : job.title}</h1>
                    <p className='text-2xl m-2 overflow-auto'>{job.description === '' ? 'This is a long description of what you need people to do for you in exchange for that chedda!' : job.description}</p>
                    <div className='flex  m-2'>
                        {job.img !== '' ? 
                    
                        <Image
                                src={`data:image/jpeg;base64,${job.img}`}
                                className='rounded-xl'
                                width={150}
                                height={150}
                                alt="Picture of the author"
                              />
                            :
                            <div className=' w-48 h-48 rounded-lg bg-gray-400  '></div>}

                        <div className='flex flex-col m-2'>
                            <div className='bg-black text-white p-1 mx-2 my-1'>{job.profession === '' ? 'PROFESSION' : job.profession}</div>
                            <div className='border-2 border-black p-1   mx-2 my-1'>{job.budget === '' ? '$$$' : job.budget}</div>
                            <div className='border-2 border-black p-1 mx-2 my-1'>{job.start === '' ? 'Date Range' : job.start}</div>
                            <div className='border-2 border-black p-1  mx-2 my-1'>{job.location === '' ? 'Location' : job.location}</div>
                        </div>
                    </div>

                </div>

            <DeleteButton setAllJobs={setAllJobs} id={job.id}/>
            </div>
        )})
      }
    </div>



  )
}
