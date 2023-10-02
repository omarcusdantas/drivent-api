import { notFoundCustomMessageError, paymentRequiredCustomMessageError } from '@/errors';
import { enrollmentRepository, ticketsRepository, hotelsRepository } from '@/repositories';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundCustomMessageError('User does not have enrollment');

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundCustomMessageError('User does not have ticket');
  if (ticket.status !== 'PAID') throw paymentRequiredCustomMessageError('Ticket is not paid');
  if (ticket.TicketType.isRemote === true) throw paymentRequiredCustomMessageError('Ticket is not remote');
  if (ticket.TicketType.includesHotel === false) throw paymentRequiredCustomMessageError('Ticket does not offer hotel');

  const hotels = await hotelsRepository.findHotels();
  if (hotels.length === 0) throw notFoundCustomMessageError('There are no hotels');

  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundCustomMessageError('User does not have enrollment');

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundCustomMessageError('User does not have ticket');
  if (ticket.status !== 'PAID') throw paymentRequiredCustomMessageError('Ticket is not paid');
  if (ticket.TicketType.isRemote === true) throw paymentRequiredCustomMessageError('Ticket is not remote');
  if (ticket.TicketType.includesHotel === false) throw paymentRequiredCustomMessageError('Ticket does not offer hotel');

  const hotel = await hotelsRepository.findHotelById(hotelId);
  if (!hotel) throw notFoundCustomMessageError('Hotel not found');

  return hotel;
}

export const hotelsService = { getHotels, getHotelById };
