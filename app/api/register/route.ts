import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, email, password, mobile, role_name, status } = body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const user = await db.user.create({
      data: {
        name,
        username,
        email,
        password,
        mobile,
        role_name,
        status,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await db.user.findMany();
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
