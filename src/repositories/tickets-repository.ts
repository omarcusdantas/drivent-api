import { TicketType, Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicketByUserId(userId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: { userId },
    },
    include: { TicketType: true },
  });
}

export const ticketsRepository = {
  findTicketTypes,
  findTicketByUserId,
};
