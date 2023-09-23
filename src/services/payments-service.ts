import { paymentsRepository, ticketsRepository } from '@/repositories';
import { notFoundCustomMessageError, unauthorizedCustomMessageError } from '@/errors';
import { PaymentBody } from '@/protocols';

export async function getByTicketId(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findById(ticketId);
  if (!ticket) throw notFoundCustomMessageError('Ticket not found');
  if (ticket.Enrollment.userId !== userId) throw unauthorizedCustomMessageError('Ticket not owned by user');

  const payment = await paymentsRepository.findByTicketId(ticketId);
  return payment;
}

export async function payTicket(userId: number, data: PaymentBody) {
  const { ticketId, cardData } = data;

  const ticket = await ticketsRepository.findById(ticketId);
  if (!ticket) throw notFoundCustomMessageError('Ticket not found');
  if (ticket.Enrollment.userId !== userId) throw unauthorizedCustomMessageError('Ticket not owned by user');

  const newPayment = await paymentsRepository.create({
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.slice(-4),
  });

  await ticketsRepository.updateStatusById(ticketId, 'PAID');
  return newPayment;
}

export const paymentsService = {
  getByTicketId,
  payTicket,
};
