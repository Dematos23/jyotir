import prisma from "@/utils/prisma"

async function findReservation(reservationId: string) {
  if (!reservationId) {
    return { message: "No se ha enviado reservation id" };
  }

  return await prisma.reservations.findUnique({
    where: {
      id: reservationId,
    },
    include: {
      users: true,
      clients: true,
    },
  });
}

export default findReservation;
