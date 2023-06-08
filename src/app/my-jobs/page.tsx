'use client'
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/store';
import Image from 'next/image';

function Profile() {
  const [userJobs, setUserJobs] = useState([]);
  const { userId } = useGlobalContext();

  async function getJobs() {
    const res = await fetch('api/profile', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      cache: 'no-store',
      body: JSON.stringify({ userId: userId })
    });
    const newRes = await res.json();
    setUserJobs(newRes.jobsPosted.jobsPosted);
  }

  useEffect(() => {
    getJobs();
  }, [userId]);

  if (userJobs.length === 0) return (<div>Loading...</div>);

  return (
    <div className='mx-auto w-full flex flex-col align-middle justify-center items-center '>
      {userJobs.map(job => (
        <div key={job.id} className="border-2 border-black p-4 my-4 w-3/4">
          <h2 className="font-bold text-lg mb-2">{job.title}</h2>
          <p className="text-gray-700">{job.description}</p>
          <div className="text-sm text-gray-600">
            <p><span className="font-bold">Email:</span> {job.email}</p>
            <p><span className="font-bold">Profession:</span> {job.profession}</p>
            <p><span className="font-bold">Budget:</span> {job.Budget}</p>
            <p><span className="font-bold">Location:</span> {job.location}</p>
            <p><span className="font-bold">Start:</span> {job.start}</p>
            <p><span className="font-bold">End:</span> {job.end}</p>
            <div className='flex  m-2'>
              {job.img !== '' ?
                <Image
                  src={`data:image/jpeg;base64,${job.img}`}
                  className='rounded-xl'
                  width={150}
                  height={150}
                  alt="Picture of the author"
                /> :
                <div className=' w-48 h-48 rounded-lg bg-gray-400  '></div>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;

