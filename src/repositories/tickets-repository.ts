import { TicketType, Ticket } from '@prisma/client';
import { prisma } from '@/config';

type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>;
type CreatedTicket = Ticket & { TicketType: TicketType };

async function findTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTypeById(id: number): Promise<TicketType> {
  return prisma.ticketType.findUnique({
    where: { id },
  });
}

async function findByUserId(userId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: { userId },
    },
    include: { TicketType: true },
  });
}

async function create(newTicket: CreateTicket): Promise<CreatedTicket> {
  return prisma.ticket.create({
    data: { ...newTicket, status: 'RESERVED' },
    include: { TicketType: true },
  });
}

export const ticketsRepository = {
  findTypes,
  findByUserId,
  create,
  findTypeById,
};
