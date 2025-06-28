import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sentence, translation, notes, source, tags } =
    await request.json();

  const word = await prisma.sentence.create({
    data: {
      userId: session.user.id,
      sentence,
      translation,
      notes,
      source,
      tags,
    },
  });
  return Response.json(word, { status: 201 });
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const words = await prisma.sentence.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      addedAt: "desc",
    },
  });

  return Response.json(words, { status: 200 });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  console.log("Deleting word with ID:", id);
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedWord = await prisma.sentence.delete({
    where: {
      userId: session.user.id,
      id: id, // Ensure this matches the ID type in your database
    },
  });

  return Response.json(deletedWord, { status: 200 });
}