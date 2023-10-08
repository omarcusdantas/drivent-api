import { notFoundCustomMessageError, forbiddenCustomMessageError } from '@/errors';
import { bookingsRepository, ticketsRepository, enrollmentRepository, hotelRepository } from '@/repositories';

async function getByUserId(userId: number) {
  const booking = await bookingsRepository.findByUserId(userId);
  if (!booking) throw notFoundCustomMessageError('Booking not found');
  return booking;
}

async function create(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundCustomMessageError('Ticket not found');
  if (ticket.TicketType.isRemote) throw forbiddenCustomMessageError('Ticket is remote');
  if (!ticket.TicketType.includesHotel) throw forbiddenCustomMessageError('Ticket does not include hotel');
  if (ticket.status !== 'PAID') throw forbiddenCustomMessageError('Ticket not paid');

  const room = await hotelRepository.findRoomWithBookingCountById(roomId);
  if (!room) throw notFoundCustomMessageError('Room not found');
  if (room.capacity === room._count.Booking) throw forbiddenCustomMessageError('Room is full');

  const booking = await bookingsRepository.findByUserId(userId);
  if (booking) throw forbiddenCustomMessageError('User already has a booking');

  const newBooking = await bookingsRepository.create(userId, roomId);
  return { bookingId: newBooking.id };
}

export const bookingService = {
  getByUserId,
  create,
};
