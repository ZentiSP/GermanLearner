import { PrismaClient } from '../../generated/prisma/client';

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    errorFormat: 'pretty',
  });
} else {
  // Prevent multiple instances of Prisma Client in development (hot reload)
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      errorFormat: 'pretty',
    });
  }
  prisma = global.prisma;
}

export default prisma;