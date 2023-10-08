import { notFoundError } from '@/errors';
import { bookingsRepository } from '@/repositories';

async function getByUserId(userId: number) {
  const booking = await bookingsRepository.findByUserId(userId);
  if (!booking) throw notFoundError();
  return booking;
}

export const bookingService = {
  getByUserId,
};
