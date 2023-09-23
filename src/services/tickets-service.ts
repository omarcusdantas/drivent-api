import { ticketsRepository, enrollmentRepository } from '@/repositories';
import { notFoundCustomMessageError, invalidDataError } from '@/errors';

export async function getTypes() {
  const ticketsTypes = await ticketsRepository.findTypes();
  return ticketsTypes;
}

export async function getByUserId(userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw notFoundCustomMessageError("User doesn't have an enrollment");

  const ticket = await ticketsRepository.findByUserId(userId);
  if (!ticket) throw notFoundCustomMessageError('Ticket not found');
  return ticket;
}

export async function create(userId: number, ticketTypeId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw notFoundCustomMessageError("User doesn't have an enrollment");

  const ticketType = await ticketsRepository.findTypeById(ticketTypeId);
  if (!ticketType) throw invalidDataError('Ticket type');

  const newTicket = await ticketsRepository.create({ ticketTypeId, enrollmentId: enrollments.id });
  return newTicket;
}

export const ticketsService = {
  getTypes,
  getByUserId,
  create,
};
