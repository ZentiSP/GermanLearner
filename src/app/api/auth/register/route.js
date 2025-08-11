import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "User already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split("@")[0], // Default to email prefix if no display name provided
      },
    });

    return Response.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
