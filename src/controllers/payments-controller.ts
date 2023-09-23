import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { paymentsService } from '@/services';
import { invalidDataError } from '@/errors';
import { PaymentBody } from '@/protocols';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;
  if (!ticketId) throw invalidDataError('Ticket Id is required');

  const payment = await paymentsService.getByTicketId(Number(ticketId), userId);
  return res.status(httpStatus.OK).send(payment);
}

export async function payTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const payment = await paymentsService.payTicket(userId, req.body as PaymentBody);
  return res.status(httpStatus.OK).send(payment);
}
