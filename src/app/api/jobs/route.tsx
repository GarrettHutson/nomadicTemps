// import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
// const prisma = new PrismaClient()
import { prisma } from '@/src/app/lib/prisma';

export async function GET(request:Request){

     
    // await prisma.$connect();
    const allJobs = await prisma.jobs.findMany()

    // await prisma.$disconnect();
    return NextResponse.json({allJobs:allJobs});

}