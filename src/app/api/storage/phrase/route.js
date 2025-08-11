import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { phrase, translation, notes, tags } = await request.json();

  const pharse = await prisma.phrase.create({
    data: {
      userId: session.user.id,
      phrase,
      translation,
      notes: notes ? notes : "",
      tags: tags ? tags : [], // Ensure tags is an array
    },
  });
  return Response.json(pharse, { status: 201 });
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const phrases = await prisma.phrase.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      addedAt: "desc",
    },
  });

  return Response.json(phrases, { status: 200 });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  console.log("Deleting pharse with ID:", id);
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  const deletedWord = await prisma.phrase.delete({
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

  const { id, phrase, translation, notes, tags } = await request.json();
  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  let updatedWord;
  try {
    updatedWord = await prisma.phrase.update({
      where: {
        userId: session.user.id,
        id: id, // Ensure this matches the ID type in your database
      },
      data: {
        phrase,
        translation,
        notes: notes ? notes : "",
        tags: tags ? tags : [], // Ensure tags is an array
      },
    });
  } catch (error) {
    console.error("Error updating pharse:", error);
    return Response.json({ error: "Failed to update pharse" }, { status: 500 });
  }

  return Response.json(updatedWord, { status: 200 });
}
