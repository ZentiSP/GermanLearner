import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { german, meaning, example, english, tags } = await request.json();

  const word = await prisma.word.create({
    data: {
      userId: session.user.id,
      german,
      meaning,
      example,
      english,
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

  const words = await prisma.word.findMany({
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

  const deletedWord = await prisma.word.delete({
    where: {
      userId: session.user.id,
      id: id, // Ensure this matches the ID type in your database
    },
  });

  return Response.json(deletedWord, { status: 200 });
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, german, meaning, example, english, tags } = await request.json();
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  let updatedWord;
  try {
    updatedWord = await prisma.word.update({
      where: {
        userId: session.user.id,
        id: id, // Ensure this matches the ID type in your database
      },
      data: {
        german,
        meaning,
        example,
        english,
        tags,
      },
    });
  } catch (error) {
    console.error("Error updating word:", error);
    return Response.json({ error: "Failed to update word" }, { status: 500 });
  }

  return Response.json(updatedWord, { status: 200 });
}
