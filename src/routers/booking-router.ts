import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking, createBooking } from '@/controllers';
import { bookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBooking).post('/', validateBody(bookingSchema), createBooking);

export { bookingRouter };
