import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({ where: { ticketId } });
}

export const paymentsRepository = {
  findByTicketId,
};
