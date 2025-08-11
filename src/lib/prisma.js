import { PrismaClient } from "../../generated/prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ errorFormat: "pretty" });
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({ errorFormat: "pretty" });
  }
  prisma = globalThis.prisma;
}

export default prisma;
