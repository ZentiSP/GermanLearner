const { PrismaClient } = require('../../generated/prisma/client');

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

export default prisma;