import { notFoundCustomMessageError, paymentRequiredCustomMessageError } from '@/errors';
import { enrollmentRepository, ticketsRepository, hotelsRepository } from '@/repositories';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundCustomMessageError("User does not have enrollment");

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundCustomMessageError('User does not have ticket');

  const hotels = await hotelsRepository.findHotels();
  if (hotels.length === 0) throw notFoundCustomMessageError('There are no hotels');

  if (ticket.status !== 'PAID') throw paymentRequiredCustomMessageError('Ticket is not paid');

  if (ticket.TicketType.isRemote === true) throw paymentRequiredCustomMessageError('Ticket is not remote');

  if (ticket.TicketType.includesHotel === false) throw paymentRequiredCustomMessageError('Ticket does not offer hotel');

  return hotels;
}

export const hotelsService = { getHotels };
