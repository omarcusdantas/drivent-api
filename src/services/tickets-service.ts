import { ticketsRepository } from '@/repositories';

export async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.findTicketTypes();
  return ticketTypes;
}

export const ticketsService = {
  getTicketTypes,
};
