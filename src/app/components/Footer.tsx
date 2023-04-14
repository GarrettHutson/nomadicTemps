import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    <div className='flex flex-col justify-center gap-2 w-full mx-auto  mb-8 mt-8 text-center align-bottom'>
        <div className='flex gap-2 justify-center'>
        <div>Instagram</div>
    <div>TikTok</div>
    <div>Contact</div>
        </div>
    
    <div className='flex gap-2 justify-center text-slate-400'>
        <div className=''>Terms |</div>
        <div>Surely Work |</div>
        <div>All Rights Reserved 2023</div>
    </div>
    </div>
  )
}

export default Footer