import { ticketsRepository, enrollmentRepository } from '@/repositories';
import { notFoundCustomMessageError } from '@/errors';

export async function getTicketTypes() {
  const ticketsTypes = await ticketsRepository.findTicketTypes();
  return ticketsTypes;
}

export async function getTicketByUserId(userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw notFoundCustomMessageError("User doesn't have an enrollment");

  const ticket = await ticketsRepository.findTicketByUserId(userId);
  if (!ticket) throw notFoundCustomMessageError('Ticket not found');
  return ticket;
}

export const ticketsService = {
  getTicketTypes,
  getTicketByUserId,
};
