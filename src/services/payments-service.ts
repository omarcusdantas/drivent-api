import { paymentsRepository, ticketsRepository } from '@/repositories';
import { notFoundCustomMessageError, unauthorizedCustomMessageError } from '@/errors';

export async function getByTicketId(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findById(ticketId);
  if (!ticket) throw notFoundCustomMessageError('Ticket not found');
  if (ticket.Enrollment.userId !== userId) throw unauthorizedCustomMessageError('Ticket not owned by user');

  const payment = await paymentsRepository.findByTicketId(ticketId);
  return payment;
}

export const paymentsService = {
  getByTicketId,
};
