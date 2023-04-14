import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()


export async function POST(request: Request) {
    const req = await request.json();
    const { email, username } = req;
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        return new Response('User with email already exists', { status: 409 });
    }
    const newUser = await prisma.user.create({
        data: {
            email: email,
            username:username
        }
    });
    await prisma.$disconnect();

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
}

