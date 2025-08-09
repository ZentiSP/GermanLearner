import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch daily history, sorted by date descending
  const history = await prisma.dailyHistory.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 30, // last 30 days
  });

  return Response.json(history, { status: 200 });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { date, known, unknown, score, flashcards } = await request.json();
  const entry = await prisma.dailyHistory.create({
    data: {
      userId: session.user.id,
      date: new Date(date),
      known,
      unknown,
      score,
      flashcards,
    },
  });
  return Response.json(entry, { status: 201 });
}