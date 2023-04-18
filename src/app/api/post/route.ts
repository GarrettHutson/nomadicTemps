import { PrismaClient } from '@prisma/client'
import { Console } from 'console';
import { NextResponse } from 'next/server';
import sharp from 'sharp'; // Import sharp library for image compression
const prisma = new PrismaClient()

export async function POST(request: Request) {
  const req = await request.json();
  const {
    title,
    description,
    email,
    profession,
    budget,
    location,
    start,
    end,
    img,
  } = req;

  // Convert base64 image to buffer
  const buffer = Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // Compress image
  const compressedImage = await sharp(buffer).resize({ width: 500 }).toBuffer();

  await prisma.$connect()

  // Update the user's jobsPosted array with the compressed image
  const updatedUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      jobsPosted: {
        create: {
          title: title,
          description: description,
          email: email,
          profession: profession,
          Budget: budget,
          location: location,
          start: start,
          end: end,
          img: compressedImage.toString('base64'), // Convert compressed buffer to base64 string
        },
      },
    },
    include: {
      jobsPosted: true,
    },
  });
  const allJobs = await prisma.jobs.findMany()

  await prisma.$disconnect()
console.log(updatedUser,'updeteduser from post api')
  return NextResponse.json({allJobs:allJobs});
}





