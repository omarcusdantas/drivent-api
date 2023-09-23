import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes, getTicket, createTicket } from '@/controllers';
import { ticketSchema } from '@/schemas/ticket-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsTypes)
  .get('/', getTicket)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
