import { Booking } from '@prisma/client';
import { prisma } from '@/config';

async function findByUserId(userId: number): Promise<Booking> {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

export const bookingsRepository = {
  findByUserId,
};
