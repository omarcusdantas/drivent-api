import { notFoundCustomMessageError, forbiddenCustomMessageError } from '@/errors';
import { bookingRepository, ticketsRepository, enrollmentRepository, hotelRepository } from '@/repositories';

async function getByUserId(userId: number) {
  const booking = await bookingRepository.findByUserId(userId);
  if (!booking) throw notFoundCustomMessageError('Booking not found');
  return booking;
}

async function create(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw forbiddenCustomMessageError('User does not have enrollment');

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw forbiddenCustomMessageError('User does not have ticket');
  if (ticket.TicketType.isRemote) throw forbiddenCustomMessageError('Ticket is remote');
  if (!ticket.TicketType.includesHotel) throw forbiddenCustomMessageError('Ticket does not include hotel');
  if (ticket.status !== 'PAID') throw forbiddenCustomMessageError('Ticket not paid');

  const room = await hotelRepository.findRoomWithBookingCountById(roomId);
  if (!room) throw notFoundCustomMessageError('Room not found');
  if (room.capacity === room._count.Booking) throw forbiddenCustomMessageError('Room is full');

  const booking = await bookingRepository.findByUserId(userId);
  if (booking) throw forbiddenCustomMessageError('User already has a booking');

  const newBooking = await bookingRepository.create(userId, roomId);
  return { bookingId: newBooking.id };
}

async function updateByBookingIdAndRoomId(userId: number, bookingId: number, roomId: number) {
  const booking = await bookingRepository.findByUserId(userId);
  if (!booking) throw forbiddenCustomMessageError('User does not have booking');
  if (booking.id !== bookingId) throw forbiddenCustomMessageError('Booking id does not match');

  const room = await hotelRepository.findRoomWithBookingCountById(roomId);
  if (!room) throw notFoundCustomMessageError('Room not found');
  if (room.capacity === room._count.Booking) throw forbiddenCustomMessageError('Room is full');

  const updatedBooking = await bookingRepository.updateByBookingIdAndRoomId(bookingId, roomId);
  return { bookingId: updatedBooking.id };
}

export const bookingService = {
  getByUserId,
  create,
  updateByBookingIdAndRoomId,
};
