import { prisma } from '@/src/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';



// This function is executed when a GET request is made to /api/user/[id]
export async function POST(request: NextRequest) {
    const req = await request.json();
  const {userId} = req;
  

  // Fetch all jobs posted by the user with the given ID
  const jobsPosted = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      jobsPosted: true,
    },
  });

return NextResponse.json({jobsPosted:jobsPosted});
}
