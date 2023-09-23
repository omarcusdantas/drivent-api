import { ApplicationError } from '@/protocols';

export function unauthorizedCustomMessageError(details: string): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: details,
  };
}
