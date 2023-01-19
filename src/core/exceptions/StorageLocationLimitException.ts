import { GenericException } from './GenericException';

export class StorageLocationLimitException extends GenericException {
  constructor(entity: string) {
    super(`${entity} reached stock limit`);
  }
}
