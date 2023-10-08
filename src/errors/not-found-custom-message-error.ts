import { ApplicationError } from '@/protocols';

export function notFoundCustomMessageError(details: string): ApplicationError {
  return {
    name: 'NotFoundError',
    message: details,
  };
}
