import bcrypt from "bcrypt";
import prisma from "@/app/Libs/Prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log("POST CREATE USERS", err);
  }
}
