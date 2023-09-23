import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services';

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTypes();
  return res.status(httpStatus.OK).send(ticketTypes);
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticket = await ticketsService.getByUserId(userId);
  return res.status(httpStatus.OK).send(ticket);
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticket = await ticketsService.create(userId, req.body.ticketTypeId);
  return res.status(httpStatus.CREATED).send(ticket);
}
