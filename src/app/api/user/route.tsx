import { prisma } from '@/src/app/lib/prisma';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
    const req = await request.json();
    const { email, username } = req;
    await prisma.$connect()
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        return NextResponse.json(existingUser);
    }
    const newUser = await prisma.user.create({
        data: {
            email: email,
            username:username
        }
    });


    return NextResponse.json(newUser);
}

