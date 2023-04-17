import { prisma } from '<mongo-prisma>/app/lib/prisma';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
    const req = await request.json();
    const { email, username } = req;
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        // return new Response('User with email already exists', { status: 409 });
        return NextResponse.json('User with email already exists');
    }
    const newUser = await prisma.user.create({
        data: {
            email: email,
            username:username
        }
    });
    return NextResponse.json(newUser);
}

