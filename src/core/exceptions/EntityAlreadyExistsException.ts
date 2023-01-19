import { GenericException } from './GenericException';

export class EntityAlreadyExistsException extends GenericException {
  constructor(entity: string) {
    super(`${entity} already exists`);
  }
}
