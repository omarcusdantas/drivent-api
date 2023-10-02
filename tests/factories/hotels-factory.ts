import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
    },
  });
}

export async function createHotelRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.number({ min: 1, max: 200 }).toString(),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId,
    },
  });
}
