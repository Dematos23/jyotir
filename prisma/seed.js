const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const devUser = require("./seeds/devUser.seed.js");
const users = require("./seeds/users.seed.js");
const clients = require("./seeds/clients.seed.js");
async function main() {
  await Promise.all([
    devUser(prisma), 
    users(prisma), 
    clients(prisma)
  ]);
}

main()
  .catch((error) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
