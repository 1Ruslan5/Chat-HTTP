import { start } from "./app";
import { prisma } from "../prisma/client";

async function main(): Promise<void> {
  await prisma.$connect();

  await start();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
