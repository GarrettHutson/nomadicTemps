import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()

export async function GET(){

     
    await prisma.$connect();
    const allJobs = await prisma.jobs.findMany()
 console.log(allJobs,'alljobs from api')
    await prisma.$disconnect();
    return NextResponse.json({allJobs:allJobs});

}