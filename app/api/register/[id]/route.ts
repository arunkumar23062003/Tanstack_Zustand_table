import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, id: { params: { id: string } }) {
  try {
    const existingUser = await getUserById(id.params.id);
    if (!existingUser) {
      throw new Error("user not found");
    }
    return NextResponse.json(existingUser, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, id: { params: { id: string } }) {
  try {
    await getUserById(id.params.id);
    const body = await request.json();
    const { name, username, email, password, mobile, role_name, status } = body;

    const updatedUser = await db.user.update({
      where: { id: id.params.id },
      data: { name, username, email, password, mobile, role_name, status },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, id: { params: { id: string } }) {
  try {
    await getUserById(id.params.id);
    const deletedUser = await db.user.delete({
      where: { id: id.params.id },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
