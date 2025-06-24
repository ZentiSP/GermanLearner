import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { german, meaning, example, english, tags } = await request.json();

  const word = await prisma.sentence.create({
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