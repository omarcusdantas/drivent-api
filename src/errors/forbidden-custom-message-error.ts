import { ApplicationError } from '@/protocols';

export function forbiddenCustomMessageError(details: string): ApplicationError {
  return {
    name: 'forbiddenError',
    message: details,
  };
}
