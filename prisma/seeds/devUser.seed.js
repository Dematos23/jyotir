const passHash = require("../../src/utils/passHash.js");

async function devUser(prisma) {
  const password = await passHash("alessandra");
  
  await prisma.users.create({
    data: {
      email: "dematos23@gmail.com",
      name: "Diego",
      lastname: "Matos",
      spiritualName: "Samart",
      // dni: 74147399,
      password: password,
      role: "DEV",
      state: "ACTIVO"
    },
  });
}

module.exports = devUser;

