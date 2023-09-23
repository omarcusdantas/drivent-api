import Joi from 'joi';
import { PaymentBody } from '@/protocols';

export const paymentsSchema = Joi.object<PaymentBody>({
  ticketId: Joi.number().required(),
  cardData: Joi.object().required(),
});
