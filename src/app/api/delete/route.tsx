import { NextResponse } from 'next/server';
import { prisma } from '@/src/app/lib/prisma';
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()


export async function PATCH(request:Request) {
    const req = await request.json();
    const { id } = req;
    // await prisma.$connect();
    const deleted = await prisma.jobs.delete({
        where: {
         id: id
        }
    })
    const allJobs = await prisma.jobs.findMany()
    console.log(deleted)
    // await prisma.$disconnect();
    return NextResponse.json({allJobs:allJobs});
}
