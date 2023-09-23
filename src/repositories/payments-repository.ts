import { Payment } from '@prisma/client';
import { prisma } from '@/config';

type CreatePayment = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

async function findByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function create(data: CreatePayment): Promise<CreatePayment> {
  return prisma.payment.create({ data });
}

export const paymentsRepository = {
  findByTicketId,
  create,
};
