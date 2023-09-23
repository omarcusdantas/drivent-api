import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services';

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketTypes();
  return res.status(httpStatus.OK).send(ticketTypes);
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticket = await ticketsService.getTicketByUserId(userId);
  return res.status(httpStatus.OK).send(ticket);
}
