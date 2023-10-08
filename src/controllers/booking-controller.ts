import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const booking = 0;
    return res.status(httpStatus.OK).send(booking);
}
