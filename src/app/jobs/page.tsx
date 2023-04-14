

import JobCard from '../components/JobCard'

type Props = {}
function page({ }: Props) {


  return (
 <div className='h-[80%] w-full flex overflow-auto justify-center mt-48 gap-2'>
<JobCard />
 </div>

  )
}

export default page