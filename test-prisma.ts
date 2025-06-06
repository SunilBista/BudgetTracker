import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tx = await prisma.transaction.findMany();
  console.log(tx);
}

main();
