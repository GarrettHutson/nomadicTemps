
import { NextResponse } from 'next/server';
import { prisma } from '<mongo-prisma>/app/lib/prisma';

export async function GET(){

    const allJobs = await prisma.jobs.findMany()
 

    return NextResponse.json(allJobs);

}