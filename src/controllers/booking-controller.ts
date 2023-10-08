import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const booking = await bookingService.getByUserId(userId);
  return res.status(httpStatus.OK).send(booking);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const newBookingId = await bookingService.create(userId, Number(roomId));
  return res.status(httpStatus.CREATED).send(newBookingId);
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;
  const updatedBookingId = await bookingService.updateByBookingIdAndRoomId(userId, Number(bookingId), Number(roomId));
  return res.status(httpStatus.OK).send(updatedBookingId);
}
