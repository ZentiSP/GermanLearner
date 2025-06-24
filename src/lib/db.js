import prisma from "./prisma";

export async function addWord({ userId, german, meaning, example, english, tags }) {
  return await prisma.word.create({
    data: {
      userId,
      german,
      meaning,
      example,
      english,
      tags,
    },
  });
}