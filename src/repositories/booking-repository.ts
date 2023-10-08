import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type ReadBooking = Omit<Booking, 'userId' | 'roomId' | 'createdAt' | 'updatedAt'>;

async function findByUserId(userId: number): Promise<ReadBooking> {
  return prisma.booking.findFirst({
    where: { userId },
    select: { id: true, Room: true },
  });
}

export async function create(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  })
}

export const bookingsRepository = {
  findByUserId,
  create,
};
