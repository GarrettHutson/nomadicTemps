import { NextResponse } from 'next/server';
import { prisma } from '@/src/app/lib/prisma';



export async function PATCH(request:Request) {
    const req = await request.json();
    const { id } = req;

    const deleted = await prisma.jobs.delete({
        where: {
         id: id
        }
    })
    const allJobs = await prisma.jobs.findMany()


    return NextResponse.json({allJobs:allJobs});
}
