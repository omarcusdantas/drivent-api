import { ApplicationError } from '@/protocols';

export function paymentRequiredCustomMessageError(details: string): ApplicationError {
  return {
    name: 'PaymentRequiredError',
    message: details,
  };
}
