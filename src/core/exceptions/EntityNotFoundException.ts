import { GenericException } from './GenericException';

export class EntityNotFoundException extends GenericException {
  constructor(entity: string) {
    super(`${entity} not found`);
  }
}
