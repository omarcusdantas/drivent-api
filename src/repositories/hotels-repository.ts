import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

export const hotelsRepository = { findHotels };
