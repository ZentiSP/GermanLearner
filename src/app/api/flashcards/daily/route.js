import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Utility to shuffle an array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch up to 10 from each, then shuffle and take 10 total
  const [words, phrases, sentences] = await Promise.all([
    prisma.word.findMany({
      where: { userId: session.user.id },
      orderBy: { addedAt: "desc" },
      take: 10,
    }),
    prisma.phrase.findMany({
      where: { userId: session.user.id },
      orderBy: { addedAt: "desc" },
      take: 10,
    }),
    prisma.sentence.findMany({
      where: { userId: session.user.id },
      orderBy: { addedAt: "desc" },
      take: 10,
    }),
  ]);

  // Tag each type for frontend display if needed
  const all = [
    ...words.map(w => ({ ...w, type: "word" })),
    ...phrases.map(p => ({ ...p, type: "phrase" })),
    ...sentences.map(s => ({ ...s, type: "sentence" })),
  ];

  // Shuffle and pick 10
  const daily = shuffle(all).slice(0, 10);

  return Response.json(daily, { status: 200 });
}